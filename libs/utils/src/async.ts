import pLimit from 'p-limit'

type PipeContext<T> = T & { [key: string]: any }
type AsyncFunction<T, U> = (context: PipeContext<T>) => Promise<U>
type SyncFunction<T, U> = (context: PipeContext<T>) => U
type Operation<T, U> =
    | AsyncFunction<T, U>
    | SyncFunction<T, U>
    | RetryConfig
    | TimeoutConfig
    | U
type Awaited<T> = T extends Promise<infer U> ? U : T

interface RetryConfig {
    _tag: 'Retry'
    times: number
    delay: number
    while?: (error: Error) => boolean
}

interface TimeoutConfig {
    _tag: 'Timeout'
    duration: number
}

// Error types
class TimeoutError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'TimeoutError'
    }
}

class RetryError extends Error {
    constructor(message: string, public originalError: Error) {
        super(message)
        this.name = 'RetryError'
    }
}

export const runWithConcurrency =
    <T>(
        tasks: AsyncFunction<any, T>[],
        concurrency: number,
    ): AsyncFunction<any, [T[] | null, null | Error]> =>
    async (context) => {
        const limit = pLimit(concurrency)
        const limitedTasks = tasks.map((task) => limit(() => task(context)))

        const results = await Promise.allSettled(limitedTasks)

        const successResults: T[] = []
        const errors: Error[] = []

        results.forEach((result) => {
            if (result.status === 'fulfilled') {
                successResults.push(result.value)
            } else {
                errors.push(result.reason)
            }
        })

        if (errors.length > 0) {
            return [null, new Error('Some concurrent tasks failed')]
        }
        return [successResults, null]
    }

const handleAsync = async <T>(
    fn: Promise<T>,
): Promise<[T | null, null | Error]> => {
    try {
        const result = await fn
        return [result, null]
    } catch (error) {
        return [null, error as Error]
    }
}

interface Pipe {
    <A>(input: A): Awaited<A>
    <A, B>(input: A, op1: Operation<A, B>): Awaited<B>
    <A, B, C>(
        input: A,
        op1: Operation<A, B>,
        op2: Operation<PipeContext<Awaited<A> & Awaited<B>>, C>,
    ): Awaited<C>
    <A, B, C, D>(
        input: A,
        op1: Operation<A, B>,
        op2: Operation<PipeContext<Awaited<A> & Awaited<B>>, C>,
        op3: Operation<PipeContext<Awaited<A> & Awaited<B> & Awaited<C>>, D>,
    ): Awaited<D>
    <A, B, C, D, E>(
        input: A,
        op1: Operation<A, B>,
        op2: Operation<PipeContext<Awaited<A> & Awaited<B>>, C>,
        op3: Operation<PipeContext<Awaited<A> & Awaited<B> & Awaited<C>>, D>,
        op4: Operation<
            PipeContext<Awaited<A> & Awaited<B> & Awaited<C> & Awaited<D>>,
            E
        >,
    ): Awaited<E>
}

export const pipe: Pipe = (...operations: Operation<any, any>[]) => {
    const handleOperations = async () => {
        let context: PipeContext<any> = {}
        // const retryConfig = operations.find((op) => op?._tag === 'Retry')
        // const timeoutConfig = operations.find((op) => op?._tag === 'Timeout')

        for (const op of operations) {
            if (typeof op === 'function') {
                // const wrappedFn = wrapWithRetryAndTimeout(
                //     op,
                //     retryConfig,
                //     timeoutConfig?.duration,
                // )
                const [result, error] = await handleAsync(op(context))
                if (error) {
                    throw error
                }
                if (op === operations.at(-1)) return result
                context = { ...context, ...(result as any) }
            } else {
                if (op === operations.at(-1)) return op
                context = { ...context, ...op }
            }
        }
    }

    ;async () => {
        await handleOperations()
    }
}

const wrapWithRetryAndTimeout = <T, U>(
    fn: AsyncFunction<T, U> | SyncFunction<T, U>,
    retryConfig?: RetryConfig,
    timeoutDuration?: number,
): AsyncFunction<T, U> => {
    let wrappedFn = async (context: any) => {
        if (
            fn.constructor.name === 'AsyncFunction' ||
            fn.toString().includes('async')
        ) {
            return (fn as AsyncFunction<T, U>)(context)
        } else {
            return (fn as SyncFunction<T, U>)(context)
        }
    }

    if (retryConfig) {
        wrappedFn = retry(retryConfig)(wrappedFn) as AsyncFunction<T, U>
    }
    if (timeoutDuration) {
        wrappedFn = timeout(
            wrappedFn as AsyncFunction<T, U>,
            timeoutDuration,
        ) as AsyncFunction<T, U>
    }
    return wrappedFn
}

export const retryPolicy = (
    config: Omit<RetryConfig, '_tag'>,
): RetryConfig => ({
    _tag: 'Retry',
    ...config,
})
const retry = <T, U>({
    times = 3,
    delay = 1000,
    while: shouldRetry = () => true,
}: RetryConfig) => {
    return (fn: AsyncFunction<T, U>): AsyncFunction<T, U> => {
        return async (context: PipeContext<T>): Promise<U> => {
            for (let attempt = 1; attempt <= times; attempt++) {
                try {
                    return await fn(context)
                } catch (error) {
                    if (attempt === times || !shouldRetry(error as Error)) {
                        throw new RetryError(
                            `Failed after ${attempt} attempts`,
                            error as Error,
                        )
                    }
                    await new Promise((resolve) =>
                        setTimeout(resolve, delay * attempt),
                    )
                }
            }
            throw new Error('Unexpected error in retry')
        }
    }
}

export const timeoutPolicy = (duration: number): TimeoutConfig => ({
    _tag: 'Timeout',
    duration,
})
const timeout = <T, U>(
    fn: AsyncFunction<T, U>,
    ms: number,
): AsyncFunction<T, U> => {
    return async (context: PipeContext<T>): Promise<U> => {
        let timeoutId: NodeJS.Timeout | undefined
        const timeoutPromise = new Promise<never>((_, reject) => {
            timeoutId = setTimeout(
                () =>
                    reject(
                        new TimeoutError(`Operation timed out after ${ms}ms`),
                    ),
                ms,
            )
        })

        try {
            const result = await Promise.race([fn(context), timeoutPromise])
            clearTimeout(timeoutId)
            return result
        } catch (error) {
            clearTimeout(timeoutId)
            throw error
        }
    }
}

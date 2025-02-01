export const handleAsync = async <T>(
    fn: Promise<T>,
): Promise<[T | null, null | Error]> => {
    try {
        const result = await fn
        return [result, null]
    } catch (error) {
        return [null, error as Error]
    }
}

type PromiseObject<T> = {
    promise: Promise<T>
    required?: boolean
}

type PromiseResult<T> = T extends Promise<infer U> ? U : never

// add pLimit use for max concurrency control
type PromiseResults<T extends readonly PromiseObject<unknown>[]> = {
    [K in keyof T]: T[K]['required'] extends true
        ? PromiseResult<T[K]['promise']>
        : PromiseResult<T[K]['promise']> | null
}

export async function resolvePromises<
    const T extends readonly PromiseObject<unknown>[],
>(promises: T) {
    const settledPromises = await Promise.allSettled(
        promises.map((p) => p.promise),
    )

    let errorMessage = ''
    const results = promises.map((promiseObject, index) => {
        const settledPromise = settledPromises[index]
        if (settledPromise.status === 'fulfilled') {
            return settledPromise.value as PromiseResult<
                (typeof promiseObject)['promise']
            >
        } else {
            if (promiseObject.required) {
                console.error(
                    `❌ resolvePromises error:`,
                    settledPromise.reason,
                )
                errorMessage = settledPromise.reason
            } else {
                console.error(
                    `❌ resolvePromises error:`,
                    settledPromise.reason,
                )
                return null
            }
        }
    }) as PromiseResults<T>

    return {
        results,
        errorMessage,
    }
}

type Fulfilled<T> = { status: 'fulfilled'; value: T }
type Rejected = { status: 'rejected'; reason: string }
type Settled<T> = Fulfilled<T> | Rejected

export function extractFulfilledValues<T extends readonly any[]>(results: {
    [K in keyof T]: Settled<T[K]>
}): {
    values: { [K in keyof T]: T[K] | undefined }
    hasRejections: boolean
} {
    const values = results.map((result) =>
        result.status === 'fulfilled' ? result.value : undefined,
    ) as { [K in keyof T]: T[K] | undefined }

    const hasRejections = results.some((result) => result.status === 'rejected')

    return {
        values,
        hasRejections,
    }
}

type PipeFunction<T = any> = (ctx: PipeContext) => T | Promise<T>

interface PipeContext {
    [key: string]: any
}

interface PipeResult extends Promise<PipeContext> {
    then<TResult1 = PipeContext, TResult2 = never>(
        onfulfilled?:
            | ((value: PipeContext) => TResult1 | PromiseLike<TResult1>)
            | undefined
            | null,
        onrejected?:
            | ((reason: any) => TResult2 | PromiseLike<TResult2>)
            | undefined
            | null,
    ): Promise<TResult1 | TResult2>
}

type Pipe = {
    <A>(fn1: PipeFunction<A>): PipeResult
    <A, B>(fn1: PipeFunction<A>, fn2: PipeFunction<B>): PipeResult
    <A, B, C>(
        fn1: PipeFunction<A>,
        fn2: PipeFunction<B>,
        fn3: PipeFunction<C>,
    ): PipeResult
    <A, B, C, D>(
        fn1: PipeFunction<A>,
        fn2: PipeFunction<B>,
        fn3: PipeFunction<C>,
        fn4: PipeFunction<D>,
    ): PipeResult
    (...fns: PipeFunction[]): PipeResult
}

export const pipe: Pipe = (...fns: PipeFunction[]): PipeResult => {
    const pipePromise = async (): Promise<PipeContext> => {
        let context: PipeContext = {}

        for (const fn of fns) {
            const [result, error] = await handleAsync(fn(context))
            if (error) {
                throw error
            }

            if (typeof result === 'object' && result !== null) {
                context = { ...context, ...result }
            } else {
                context = { ...context, value: result }
            }
        }

        return context
    }

    const result = pipePromise() as PipeResult
    result.then = (onfulfilled, onrejected) =>
        pipePromise().then(onfulfilled, onrejected)

    return result
}

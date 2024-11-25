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

type Fulfilled<T> = { status: 'fulfilled'; value: T }
type Rejected = { status: 'rejected'; reason: any }
type Settled<T> = Fulfilled<T> | Rejected

export function extractFulfilledValues<T extends readonly any[]>(results: {
    [K in keyof T]: Settled<T[K]>
}): {
    fulfilledValues: { [K in keyof T]: T[K] | undefined }
    hasRejections: boolean
} {
    const fulfilledValues = results.map((result) =>
        result.status === 'fulfilled' ? result.value : undefined,
    ) as { [K in keyof T]: T[K] | undefined }

    const hasRejections = results.some((result) => result.status === 'rejected')

    return {
        fulfilledValues,
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

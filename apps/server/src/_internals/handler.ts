import { TypedResponse } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { RouterEnum } from '@server'

type RetryOptions = {
    attempts: number
    backoff?: 'constant' | 'exponential'
    delay?: number
}

type TimeoutOptions = {
    duration: number
    errorMessage?: string
}

type RouteHandlerOptions = {
    retry?: RetryOptions
    timeout?: TimeoutOptions
    router: RouterEnum
}

type RouteContext = {
    startTime: number
    attempts: number
}

const withRetry = async <T>(
    fn: () => Promise<T>,
    options: RetryOptions,
    context: RouteContext,
): Promise<T> => {
    try {
        return await fn()
    } catch (error) {
        if (context.attempts >= options.attempts) throw error

        const delay =
            options.backoff === 'exponential'
                ? (options.delay || 1000) * Math.pow(2, context.attempts)
                : options.delay || 1000

        await new Promise((resolve) => setTimeout(resolve, delay))
        context.attempts++
        return withRetry(fn, options, context)
    }
}

// RouteFunction now can return either data or a TypedResponse
type RouteFunction<TOutput> = (
    handler: RouteHandler,
) =>
    | Promise<TOutput | TypedResponse<TOutput>>
    | TOutput
    | TypedResponse<TOutput>

export class RouteHandler {
    private options: RouteHandlerOptions

    constructor(options: RouteHandlerOptions) {
        this.options = options
    }

    private async withRetry<T>(fn: () => Promise<T>): Promise<T> {
        const { retry } = this.options
        let attempts = 0

        while (true) {
            try {
                return await fn()
            } catch (error) {
                if (!retry || attempts >= retry.attempts) throw error
                attempts++
                const delay =
                    retry.backoff === 'exponential'
                        ? (retry.delay || 1000) * Math.pow(2, attempts)
                        : retry.delay || 1000
                await new Promise((resolve) => setTimeout(resolve, delay))
            }
        }
    }

    private async withTimeout<T>(fn: () => Promise<T>): Promise<T> {
        const { timeout } = this.options
        if (!timeout) return fn()

        return Promise.race([
            fn(),
            new Promise<never>((_, reject) =>
                setTimeout(
                    () =>
                        reject(
                            new Error(
                                timeout.errorMessage || 'Operation timed out',
                            ),
                        ),
                    timeout.duration,
                ),
            ),
        ])
    }

    pipe<T1, T2>(
        fn1: RouteFunction<T1>,
        fn2: (data: T1) => TypedResponse<T2>,
    ): Promise<TypedResponse<T2>>
    pipe<T1>(fn1: RouteFunction<T1>): Promise<TypedResponse<T1>>
    pipe(...fns: RouteFunction<any>[]): Promise<any> {
        const execute = async () => {
            try {
                let result: unknown = undefined

                for (const fn of fns) {
                    result = await fn(this)
                }

                return result
            } catch (error) {
                const errorMessage = `❌ Error in ${this.options.router}.${error.stack?.split('/n')[1].trim()}: ${error.message}`
                console.error(errorMessage)
                throw new HTTPException(500, { message: errorMessage })
            }
        }

        return this.withRetry(() => this.withTimeout(execute))
    }
}

export const handler = (options: RouteHandlerOptions) =>
    new RouteHandler(options)

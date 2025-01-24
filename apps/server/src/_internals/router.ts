import { Context, Hono, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { MiddlewareHandler, Variables } from 'hono/types'
import { StatusCode } from 'hono/utils/http-status'
import { ZodError } from 'zod'
import { bodyParsingMiddleware, queryParsingMiddleware } from './middleware'
import { MutationOperation, QueryOperation } from './types'

type OperationType<I extends Record<string, unknown>, O> =
    | QueryOperation<I, O>
    | MutationOperation<I, O>

export const router = <T extends Record<string, OperationType<any, any>>>(
    obj: T,
) => {
    const route = new Hono<{ Bindings: {}; Variables: any }>().onError(
        (err, c) => {
            if (err instanceof HTTPException) {
                return c.json(
                    {
                        error: 'Server Error',
                        message: err.message,
                        type: 'HTTPException',
                    },
                    err.status,
                )
            } else {
                console.error(
                    `💻❌ An unknown server error occurred: ${err.message}`,
                )
                return c.json(
                    {
                        error: 'Unknown Error',
                        message: 'An unexpected error occurred',
                        type: 'UnknownError',
                    },
                    500,
                )
            }
        },
    )

    Object.entries(obj).forEach(([key, operation]) => {
        const path = `/${key}` as const

        const operationMiddlewares: MiddlewareHandler[] =
            operation.middlewares.map((middleware) => {
                const wrapperFunction = async (c: Context, next: Next) => {
                    const ctx = c.get('__middleware_output') ?? {}

                    const nextWrapper = <B>(args: B) => {
                        c.set('__middleware_output', { ...ctx, ...args })
                        return { ...ctx, ...args }
                    }

                    const res = await middleware({ ctx, next: nextWrapper, c })
                    c.set('__middleware_output', { ...ctx, ...res })

                    await next()
                }

                return wrapperFunction
            })

        if (operation.type === 'query') {
            console.info(
                `💻 Invoked ${path} with input ${JSON.stringify(operation.schema?.parse({}))}`,
            )

            if (operation.schema) {
                route.get(
                    path,
                    queryParsingMiddleware,
                    ...operationMiddlewares,
                    (c) => {
                        const ctx = c.get('__middleware_output') || {}
                        const parsedQuery = c.get('parsedQuery')

                        let input
                        try {
                            input = operation.schema?.parse(parsedQuery)
                        } catch (err) {
                            if (err instanceof ZodError) {
                                console.error(
                                    `💻❌ A validation error occured on the server: ${err.message}`,
                                )
                                throw new HTTPException(400, {
                                    cause: err,
                                    message: err.message,
                                })
                            } else {
                                throw err
                            }
                        }

                        return operation.handler({ c, ctx, input })
                    },
                )
            } else {
                route.get(path, ...operationMiddlewares, (c) => {
                    const ctx = c.get('__middleware_output') || {}

                    console.info(
                        `💻 Invoked ${path} with input ${JSON.stringify(ctx)}`,
                    )

                    return operation.handler({ c, ctx, input: undefined })
                })
            }
        } else if (operation.type === 'mutation') {
            console.info(
                `💻 Invoked ${path} with input ${JSON.stringify(operation.schema?.parse({}))}`,
            )

            if (operation.schema) {
                route.post(
                    path,
                    bodyParsingMiddleware,
                    ...operationMiddlewares,
                    (c) => {
                        const ctx = c.get('__middleware_output') || {}
                        const parsedBody = c.get('parsedBody')

                        let input
                        try {
                            input = operation.schema?.parse(parsedBody)
                        } catch (err) {
                            if (err instanceof ZodError) {
                                console.error(
                                    `💻❌ A validation error occured on the server: ${err.message}`,
                                )
                                throw new HTTPException(400, {
                                    cause: err,
                                    message: err.message,
                                })
                            } else {
                                throw err
                            }
                        }

                        return operation.handler({ c, ctx, input })
                    },
                )
            } else {
                route.post(path, ...operationMiddlewares, (c) => {
                    const ctx = c.get('__middleware_output') || {}

                    return operation.handler({ c, ctx, input: undefined })
                })
            }
        }
    })

    type InferInput<T> = T extends OperationType<infer I, any> ? I : {}
    type InferOutput<T> = T extends OperationType<any, infer I> ? I : {}

    return route as Hono<
        { Bindings: {}; Variables: Variables },
        {
            [K in keyof T]: T[K] extends QueryOperation<any, any>
                ? {
                      $get: {
                          input: InferInput<T[K]>
                          output: InferOutput<T[K]>
                          outputFormat: 'json'
                          status: StatusCode
                      }
                  }
                : {
                      $post: {
                          input: InferInput<T[K]>
                          output: InferOutput<T[K]>
                          outputFormat: 'json'
                          status: StatusCode
                      }
                  }
        }
    >
}

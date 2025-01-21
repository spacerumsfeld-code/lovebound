import { Context, TypedResponse } from 'hono'
import { z } from 'zod'
import { Bindings } from 'hono/types'

export type Middleware<I> = ({
    ctx,
    next,
    c,
}: {
    ctx: I
    next: <B>(args?: B) => B & I
    c: Context<{ Bindings: {} }>
}) => Promise<any>

export type MiddlewareFunction<T = {}, R = void> = (params: {
    ctx: T
    next: <B>(args: B) => Promise<B & T>
    c: Context<{ Bindings: Bindings }>
}) => Promise<R>

export type QueryOperation<
    Schema extends Record<string, unknown>,
    ZodInput = never,
> = {
    type: 'query'
    schema?: z.ZodType<Schema>
    handler: <Ctx, Output>({
        ctx,
        c,
        input,
    }: {
        ctx: Ctx
        c: Context
        input: ZodInput
    }) => Promise<TypedResponse<Output>>
    middlewares: Middleware<any>[]
}

export type MutationOperation<
    Schema extends Record<string, unknown>,
    ZodInput = never,
> = {
    type: 'mutation'
    schema?: z.ZodType<Schema>
    handler: <Input, Output>({
        ctx,
        c,
    }: {
        ctx: Input
        c: Context
        input: ZodInput
    }) => Promise<TypedResponse<Output>>
    middlewares: Middleware<any>[]
}

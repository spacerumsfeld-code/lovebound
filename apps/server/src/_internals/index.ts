import { Procedure } from './procedure'
import { MiddlewareFunction } from './types'

export const b = {
    middleware: <T = {}, R = void>(
        fn: MiddlewareFunction<T, R>,
    ): MiddlewareFunction<T, R> => {
        return fn
    },
}

export const authMiddleware = b.middleware(async ({ c, next }) => {
    const authToken = c.req.header('Authorization')
    const userId = authToken?.split(' ')[1]

    return await next({ userId: userId ?? null })
})

const baseProcedure = new Procedure()
const protectedProcedure = baseProcedure.use(authMiddleware)

export { baseProcedure, protectedProcedure }

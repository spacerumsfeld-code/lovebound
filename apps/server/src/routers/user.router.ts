import { router } from '../_internals/router'
import { handleAsync } from '@utils'
import { protectedProcedure } from '../_internals/index'
import { User } from '@core'
import { HTTPException } from 'hono/http-exception'

export const userRouter = router({
    getGettingStartedFields: protectedProcedure.query(async ({ c, ctx }) => {
        console.info('💻 Invoked userRouter.getGettingStartedFields')

        const [gettingStartedFields, gettingStartedFieldsError] =
            await handleAsync(
                User.getUserGettingStartedFields({
                    userId: ctx.userId!,
                }),
            )
        if (gettingStartedFieldsError) {
            console.error(`❌ get error:`, gettingStartedFieldsError)
            throw new HTTPException(400, {
                message: gettingStartedFieldsError.message,
            })
        }

        return c.superjson({
            data: {
                gettingStartedFields: gettingStartedFields!,
            },
        })
    }),
})

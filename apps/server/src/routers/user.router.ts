import { router } from '../_internals/router'
import { handleAsync } from '@utils'
import { protectedProcedure } from '../_internals/index'
import { Payment, User } from '@core'
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
    checkIfUserExistsInStripe: protectedProcedure.mutation(
        async ({ c, ctx }) => {
            console.info('💻 Invoked userRouter.checkIfUserExistsInStripe')

            const [userEmail, userEmailError] = await handleAsync(
                User.getUserEmail({
                    userId: ctx.userId!,
                }),
            )
            if (userEmailError) {
                console.error(
                    `❌ userRouter.checkIfUserExistsInStripe error:`,
                    userEmailError,
                )
                throw new HTTPException(400, {
                    message: userEmailError.message,
                })
            }

            const [userExistsInStripe, userExistsInStripeError] =
                await handleAsync(
                    Payment.checkIfUserExistsInStripe({
                        email: userEmail!,
                    }),
                )
            if (userExistsInStripeError) {
                console.error(
                    `❌ userRouter.checkIfUserExistsInStripe error:`,
                    userExistsInStripeError,
                )
                throw new HTTPException(400, {
                    message: userExistsInStripeError.message,
                })
            }

            return c.superjson({
                data: {
                    userExistsInStripe,
                },
            })
        },
    ),
    updateUserExploreShop: protectedProcedure.mutation(async ({ c, ctx }) => {
        console.info('💻 Invoked userRouter.updateUserExploreShop')

        const [, gettingStartedFieldsError] = await handleAsync(
            User.updateUser({
                userId: ctx.userId!,
                gettingStartedExploreShop: true,
            }),
        )
        if (gettingStartedFieldsError) {
            console.error(`❌ get error:`, gettingStartedFieldsError)
            throw new HTTPException(400, {
                message: gettingStartedFieldsError.message,
            })
        }

        return c.superjson({
            success: true,
        })
    }),
})

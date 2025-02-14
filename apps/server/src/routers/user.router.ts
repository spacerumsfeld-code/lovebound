import { router } from '../_internals/router'
import { handleAsync } from '@utils'
import { protectedProcedure } from '../_internals/index'
import { Payment, User } from '@core'
import { HTTPException } from 'hono/http-exception'

export const userRouter = router({
    getGettingStartedFields: protectedProcedure.query(async ({ c, ctx }) => {
        console.info(
            `💻 Invoked userRouter.getGettingStartedFields with ctx.userId:${ctx.userId}`,
        )

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

        /**
         * @info
         * If the user has not yet been created via the clerk webhook,
         * we need to return the default values manually.
         * */
        if (!gettingStartedFields) {
            return c.superjson({
                data: {
                    gettingStartedFields: {
                        gettingStartedCreateStory: false,
                        gettingStartedExploreShop: false,
                        gettingStartedTopUpCredits: false,
                        gettingStartedPurchaseItem: false,
                    },
                },
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
            console.info(
                `💻 Invoked userRouter.checkIfUserExistsInStripe with ctx.userId:${ctx.userId}`,
            )

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

            console.info(
                'userRouter.checkIfUserExistsInStripe',
                userExistsInStripe,
            )

            return c.superjson({
                data: {
                    userExistsInStripe,
                },
            })
        },
    ),
    getCurrentSubscriptionType: protectedProcedure.query(async ({ c, ctx }) => {
        console.info(
            `💻 Invoked userRouter.getCurrentSubscription with ctx.userId:${ctx.userId}`,
        )

        const [currentSubscription, currentSubscriptionError] =
            await handleAsync(
                Payment.getCurrentSubscriptionType({
                    userId: ctx.userId!,
                }),
            )
        if (currentSubscriptionError) {
            console.error(
                `❌ getCurrentSubscription error:`,
                currentSubscriptionError.message,
            )
            throw new HTTPException(400, {
                message: currentSubscriptionError.message,
            })
        }

        return c.superjson({
            data: {
                currentSubscriptionType: currentSubscription!,
            },
        })
    }),
    updateUserExploreShop: protectedProcedure.mutation(async ({ c, ctx }) => {
        console.info(
            `💻 Invoked userRouter.updateUserExploreShop with ctx.userId:${ctx.userId}`,
        )

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

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
            console.error(
                `❌ gettingStartedFieldsError error:`,
                gettingStartedFieldsError,
            )
            throw new HTTPException(400, {
                message: gettingStartedFieldsError.message,
            })
        }

        /**
         * @info
         * On signup, this route can be hit before the clerk webhook has been triggered
         * and actually created the user. Thus, we short-circuit here to prevent errors.
         */
        if (!gettingStartedFields) {
            return c.superjson({
                data: {
                    gettingStartedFields: {
                        gettingStartedReferralUsed: {
                            used: false,
                            code: null,
                        },
                        gettingStartedCreateStory: false,
                        gettingStartedExploreShop: false,
                        gettingStartedTopUpCredits: false,
                        gettingStartedPurchaseItem: false,
                    },
                },
            })
        }

        let code
        if (!gettingStartedFields!.gettingStartedReferralUsed) {
            const [referralCode, getReferralCodeIdError] = await handleAsync(
                User.getUserReferralCode({ userId: ctx.userId! }),
            )
            code = referralCode
            if (getReferralCodeIdError) {
                console.error(
                    `❌ getReferralCodeIdError error:`,
                    getReferralCodeIdError,
                )
                throw new HTTPException(400, {
                    message: getReferralCodeIdError.message,
                })
            }
        }

        return c.superjson({
            data: {
                gettingStartedFields: {
                    ...gettingStartedFields,
                    gettingStartedReferralUsed: {
                        used: gettingStartedFields!.gettingStartedReferralUsed,
                        code: code ?? null,
                    },
                },
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

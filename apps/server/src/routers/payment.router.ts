import { z } from 'zod'
import { router } from '../_internals/router'
import { protectedProcedure } from '../_internals/index'
import { HTTPException } from 'hono/http-exception'
import { extractFulfilledValues, handleAsync } from '@utils'
import { Payment, ProductTypeEnum, User, Notification } from '@core'
import { EmailType } from '@transactional'

export const paymentRouter = router({
    getCheckoutUrl: protectedProcedure
        .input(
            z.object({
                productType: z.nativeEnum(ProductTypeEnum),
            }),
        )
        .query(async ({ c, input, ctx }) => {
            console.info(
                `💻 Invoked paymentRouter.getCheckoutUrl with data ${JSON.stringify(
                    input,
                )}`,
            )

            const [userEmail, getUserEmailError] = await handleAsync(
                User.getUserEmail({
                    userId: ctx.userId!,
                }),
            )
            if (getUserEmailError) {
                console.error(`❌ getCheckoutUrl error:`, getUserEmailError)
                throw new HTTPException(400, {
                    message: getUserEmailError.message,
                })
            }

            const [checkoutUrl, error] = await handleAsync(
                Payment.createCheckoutSession({
                    customerEmail: userEmail!,
                    userId: ctx.userId!,
                    productType: input.productType,
                }),
            )
            if (error) {
                console.error(`❌ getCheckoutUrl error:`, error)
                throw new HTTPException(400, {
                    message: 'Failed to get checkout url',
                })
            }

            return c.superjson({
                data: {
                    checkoutUrl: checkoutUrl!,
                },
                success: true,
            })
        }),
    getCreditCount: protectedProcedure.query(async ({ c, ctx }) => {
        console.info(`💻 Invoked paymentRouter.getCreditCount`)

        const [creditCount, error] = await handleAsync(
            Payment.getCreditCount({
                userId: ctx.userId!,
            }),
        )
        if (error) {
            console.error(`❌ getCreditCount error:`, error)
            throw new HTTPException(400, {
                message: 'Failed to get credit count',
            })
        }

        return c.superjson({
            data: {
                creditCount: creditCount!,
            },
            success: true,
        })
    }),
    purchaseItemFromShop: protectedProcedure
        .input(
            z.object({
                itemId: z.number(),
                itemCost: z.number(),
            }),
        )
        .mutation(async ({ c, input, ctx }) => {
            console.info(
                `💻 Invoked paymentRouter.purchaseItemFromShop with data ${JSON.stringify(
                    input,
                )}`,
            )

            const purchaseItemPromises = [
                Payment.purchaseItem({
                    userId: ctx.userId!,
                    itemId: input.itemId,
                }),
                Payment.deductCredits({
                    userId: ctx.userId!,
                    creditCost: input.itemCost,
                }),
            ]
            const purchaseItemResults =
                await Promise.allSettled(purchaseItemPromises)

            const { hasRejections } =
                extractFulfilledValues(purchaseItemResults)
            if (hasRejections) {
                console.error(
                    `❌ purchaseItemFromShop error:`,
                    purchaseItemResults,
                )
                throw new HTTPException(400, {
                    message: 'Failed to purchase item',
                })
            }

            const [userEmail, getUserEmailError] = await handleAsync(
                User.getUserEmail({ userId: ctx.userId! }),
            )
            if (getUserEmailError) {
                console.error(getUserEmailError)
            }

            const [, sendEmailError] = await handleAsync(
                Notification.sendEmail({
                    to: userEmail!,
                    emailType: EmailType.PurchaseSuccessful,
                }),
            )
            if (sendEmailError) {
                console.error(sendEmailError)
            }

            return c.superjson({
                success: true,
            })
        }),
})

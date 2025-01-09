import { z } from 'zod'
import { router } from '../_internals/router'
import { baseProcedure } from '../_internals/index'
import { HTTPException } from 'hono/http-exception'
import { extractFulfilledValues, handleAsync } from '@utils'
import { Payment, ProductTypeEnum, User } from '@core'

export const paymentRouter = router({
    getCheckoutUrl: baseProcedure
        .input(
            z.object({
                userId: z.string(),
                productType: z.nativeEnum(ProductTypeEnum),
            }),
        )
        .query(async ({ c, input }) => {
            console.info(
                `💻 Invoked paymentRouter.getCheckoutUrl with data ${JSON.stringify(
                    input,
                )}`,
            )

            const [userEmail, getUserEmailError] = await handleAsync(
                User.getUserEmail({
                    userId: input.userId,
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
                    userId: input.userId,
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
    getCreditCount: baseProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ c, input }) => {
            console.info(
                `💻 Invoked paymentRouter.getCreditCount with data ${JSON.stringify(
                    input,
                )}`,
            )

            const [creditCount, error] = await handleAsync(
                Payment.getCreditCount({
                    userId: input.userId,
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
                    creditCount,
                },
                success: true,
            })
        }),
    purchaseItemFromShop: baseProcedure
        .input(
            z.object({
                userId: z.string(),
                itemId: z.number(),
                itemCost: z.number(),
            }),
        )
        .mutation(async ({ c, input }) => {
            console.info(
                `💻 Invoked paymentRouter.purchaseItemFromShop with data ${JSON.stringify(
                    input,
                )}`,
            )

            const purchaseItemPromises = [
                Payment.purchaseItem({
                    userId: input.userId,
                    itemId: input.itemId,
                }),
                Payment.deductCredits({
                    userId: input.userId,
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

            return c.superjson({
                data: {},
                success: true,
            })
        }),
})

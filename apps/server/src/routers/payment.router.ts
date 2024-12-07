import { z } from 'zod'
import { router } from '../_internals/router.ts'
import { baseProcedure } from '../_internals/index.ts'
import { HTTPException } from 'hono/http-exception'
import { handleAsync } from '@utils'
import { Payment, ProductTypeEnum } from '@core'

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
                `Invoked paymentRouter.getCheckoutUrl with data ${JSON.stringify(
                    input,
                )}`,
            )

            const [checkoutUrl, error] = await handleAsync(
                Payment.createCheckoutSession({
                    userId: input.userId,
                    productType: input.productType,
                }),
            )
            if (error) {
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
                `Invoked paymentRouter.getCreditCount with data ${JSON.stringify(
                    input,
                )}`,
            )

            const [creditCount, error] = await handleAsync(
                Payment.getCreditCount({
                    userId: input.userId,
                }),
            )
            if (error) {
                console.error(`❌ paymentRouter.getCreditCount error:`, error)
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
})

import { z } from 'zod'
import { router } from '../_internals/router'
import { baseProcedure } from '../_internals/index'
import { HTTPException } from 'hono/http-exception'
import { Item } from '@core'
import { extractFulfilledValues, handleAsync } from '@utils'

export const itemRouter = router({
    getShopItems: baseProcedure
        .input(
            z.object({
                userId: z.string(),
                offset: z.number().int(),
                limit: z.number().int(),
            }),
        )
        .query(async ({ c, input }) => {
            console.info(
                `💻 Invoked itemRouter.getShopItems with data ${JSON.stringify(
                    input,
                )}`,
            )

            const [shopItems, getShopItemsError] = await handleAsync(
                Item.getShopItems({
                    userId: input.userId,
                    offset: input.offset,
                    limit: input.limit,
                }),
            )
            if (getShopItemsError) {
                console.error(`❌ getShopItems error:`, getShopItemsError)
                throw new HTTPException(400, {
                    message: getShopItemsError.message,
                })
            }

            return c.superjson({
                data: {
                    items: shopItems,
                },
                success: true,
            })
        }),
    getAllItems: baseProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ c, input }) => {
            console.info(
                `💻 Invoked itemRouter.getAllItems with data ${JSON.stringify(
                    input,
                )}`,
            )

            const itemPromises = [
                Item.getAllGenres(),
                Item.getAllThemes(),
                Item.getAllLengths(),
                Item.getAllTensionLevels(),
                Item.getAllSettings(),
                Item.getAllTones(),
            ]
            const itemResults = await Promise.allSettled(itemPromises)

            const {
                values: [
                    genres,
                    themes,
                    lengths,
                    tensionLevels,
                    settings,
                    tones,
                ],
                hasRejections,
            } = extractFulfilledValues(itemResults)
            if (hasRejections) {
                console.error(`❌ getAllItems error:`, itemResults)
                throw new HTTPException(400, {
                    message: 'Failed to get all items',
                })
            }

            return c.superjson({
                data: {
                    genres: genres!,
                    themes: themes!,
                    lengths: lengths!,
                    tensionLevels: tensionLevels!,
                    settings: settings!,
                    tones: tones!,
                },
                success: true,
            })
        }),
})

import { z } from 'zod'
import { router } from '../_internals/router'
import { baseProcedure } from '../_internals/index'
import { HTTPException } from 'hono/http-exception'
import { Item } from '@core'
import { handleAsync } from '@utils'
import { ItemTypeEnum } from '@client-types/item/item.model'

export const itemRouter = router({
    getShopItems: baseProcedure
        .input(
            z.object({
                userId: z.string(),
                type: z.nativeEnum(ItemTypeEnum),
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
                    type: input.type,
                    userId: input.userId,
                    offset: input.offset,
                    limit: input.limit,
                }),
            )
            if (getShopItemsError) {
                throw new HTTPException(400, {
                    message: getShopItemsError.message,
                })
            }

            const hasMore = !(shopItems!.length < input.limit)
            const nextOffset = hasMore ? input.offset + input.limit : 0

            return c.superjson({
                data: {
                    items: shopItems,
                    hasMore,
                    nextOffset,
                },
                success: true,
            })
        }),
    getCreateStoryItems: baseProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ c, input }) => {
            console.info(
                `💻 Invoked itemRouter.getCreateStoryItems with data ${JSON.stringify(
                    input,
                )}`,
            )

            const [getCreateStoryItems, getCreateStoryItemsError] =
                await handleAsync(
                    Item.getCreateStoryItems({
                        userId: input.userId,
                    }),
                )
            if (getCreateStoryItemsError) {
                console.error(getCreateStoryItemsError)
                throw new HTTPException(400, {
                    message: getCreateStoryItemsError.message,
                })
            }

            console.info(
                'what did we get back from the store?',
                getCreateStoryItems?.length ?? [],
            )

            return c.superjson({
                data: {
                    genres: getCreateStoryItems!.filter(
                        ({ type }) => type === ItemTypeEnum.Genre,
                    ),
                    themes: getCreateStoryItems!.filter(
                        ({ type }) => type === ItemTypeEnum.Theme,
                    ),
                    lengths: getCreateStoryItems!.filter(
                        ({ type }) => type === ItemTypeEnum.Length,
                    ),
                    tensionLevels: getCreateStoryItems!.filter(
                        ({ type }) => type === ItemTypeEnum.TensionLevel,
                    ),
                    settings: getCreateStoryItems!.filter(
                        ({ type }) => type === ItemTypeEnum.Setting,
                    ),
                    tones: getCreateStoryItems!.filter(
                        ({ type }) => type === ItemTypeEnum.Tone,
                    ),
                },
                success: true,
            })
        }),
})

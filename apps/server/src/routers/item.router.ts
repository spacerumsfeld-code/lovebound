import { z } from 'zod'
import { router } from '../_internals/router'
import { protectedProcedure } from '../_internals/index'
import { Item } from '@core'
import { handleAsync } from '@utils'
import { ItemTypeEnum } from '@client-types/item/item.model'
import { handleError } from '../_internals/util'

export const itemRouter = router({
    getShopItems: protectedProcedure
        .input(
            z.object({
                type: z.nativeEnum(ItemTypeEnum),
                offset: z.number().int(),
                limit: z.number().int(),
            }),
        )
        .query(async ({ c, input, ctx }) => {
            console.info(
                `💻 Invoked itemRouter.getShopItems with data ${JSON.stringify(
                    input,
                )}`,
            )

            const [shopItems, getShopItemsError] = await handleAsync(
                Item.getShopItems({
                    type: input.type,
                    userId: ctx.userId!,
                    offset: input.offset,
                    limit: input.limit,
                }),
            )
            if (getShopItemsError) handleError(getShopItemsError)

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
    getCreateStoryItems: protectedProcedure.query(async ({ c, ctx }) => {
        console.info(`💻 Invoked itemRouter.getCreateStoryItems`)

        const [getCreateStoryItems, getCreateStoryItemsError] =
            await handleAsync(
                Item.getCreateStoryItems({
                    userId: ctx.userId!,
                }),
            )
        if (getCreateStoryItemsError) handleError(getCreateStoryItemsError)

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

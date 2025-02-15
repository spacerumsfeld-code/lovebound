import { z } from 'zod'
import { router } from '../_internals/router'
import { protectedProcedure } from '../_internals/index'
import { Item } from '@core'
import { handleAsync } from '@utils'
import { ItemTypeEnum } from '@client-types/item/item.model'
import { handleError } from '../_internals/util'
import { HTTPException } from 'hono/http-exception'

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
                `💻 Invoked itemRouter.getShopItems with ctx.userId:${ctx.userId} and input:${JSON.stringify(
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
                    items: shopItems!,
                    hasMore,
                    nextOffset,
                },
            })
        }),
    getCreateStoryItems: protectedProcedure.query(async ({ c, ctx }) => {
        console.info(
            `💻 Invoked itemRouter.getCreateStoryItems with ctx.userId:${ctx.userId}`,
        )

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
                )!,
                themes: getCreateStoryItems!.filter(
                    ({ type }) => type === ItemTypeEnum.Theme,
                )!,
                lengths: getCreateStoryItems!.filter(
                    ({ type }) => type === ItemTypeEnum.Length,
                )!,
                tensionLevels: getCreateStoryItems!.filter(
                    ({ type }) => type === ItemTypeEnum.TensionLevel,
                )!,
                settings: getCreateStoryItems!.filter(
                    ({ type }) => type === ItemTypeEnum.Setting,
                )!,
                tones: getCreateStoryItems!.filter(
                    ({ type }) => type === ItemTypeEnum.Tone,
                )!,
            },
            success: true,
        })
    }),
    getFilterItems: protectedProcedure.query(async ({ c, ctx }) => {
        console.info(
            `💻 Invoked itemRouter.getFilterItems with ctx.userId:${ctx.userId}`,
        )

        const [getFilterItems, getFilterItemsError] = await handleAsync(
            Item.getFilterItems({
                userId: ctx.userId!,
            }),
        )
        if (getFilterItemsError) {
            console.error(
                `❌ Error in itemRouter.getFilterItems: ${getFilterItemsError.message}`,
            )
            throw new HTTPException(400, {
                message: getFilterItemsError.message,
            })
        }

        return c.superjson({
            data: {
                genres: getFilterItems!.filter(
                    ({ type }) => type === ItemTypeEnum.Genre,
                )!,
                themes: getFilterItems!.filter(
                    ({ type }) => type === ItemTypeEnum.Theme,
                )!,
            },
        })
    }),
})

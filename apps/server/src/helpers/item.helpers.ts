import { ItemTypeEnum } from '@client-types/item/item.model'
import { Item } from '@core'
import { handleAsync } from '@utils'

export const getShopItems = async ({
    type,
    userId,
    offset,
    limit,
}: {
    type: ItemTypeEnum
    userId: string
    offset: number
    limit: number
}) => {
    const [shopItems, getShopItemsError] = await handleAsync(
        Item.getShopItems({
            type,
            userId,
            offset,
            limit,
        }),
    )
    if (getShopItemsError) throw getShopItemsError

    const hasMore = !(shopItems!.length < limit)
    const nextOffset = hasMore ? offset + limit : 0

    return {
        data: {
            items: shopItems!,
            hasMore,
            nextOffset,
        },
    }
}

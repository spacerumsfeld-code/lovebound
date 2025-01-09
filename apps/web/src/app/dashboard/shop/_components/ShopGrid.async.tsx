import { ItemTypeEnum } from '@client-types/item/item.model'
import { getShopItems } from '../data'

export const ShopGridAsync = async ({
    args,
}: {
    args: {
        limit: number
        offset: number
        type: ItemTypeEnum
    }
}) => {
    const { component } = await getShopItems(args)

    return component
}

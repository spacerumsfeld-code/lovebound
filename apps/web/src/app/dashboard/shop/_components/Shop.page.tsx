import { ItemTypeEnum } from '@client-types/item/item.model'
import { ShopGrid } from './ShopGrid'

export const ShopPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    // @Data
    const { type } = await searchParams
    const args = {
        limit: 16,
        offset: 0,
        type: (type ?? ItemTypeEnum.None) as ItemTypeEnum,
    }

    // @Render
    return <ShopGrid args={args} />
}

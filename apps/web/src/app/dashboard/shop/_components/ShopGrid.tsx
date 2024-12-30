import { getShopItems } from '../data'

export const ShopGrid = async () => {
    const { items } = await getShopItems()
    console.info(items)

    return <div>Heyooooo</div>
}

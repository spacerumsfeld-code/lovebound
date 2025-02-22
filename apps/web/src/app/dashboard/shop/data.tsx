import { client as api } from '@clients/api.client'
import { ItemTypeEnum } from '@client-types/item/item.model'
import { ShopGridView } from './_components/ShopGrid.view'

export const getShopItems = async (args: {
    type: ItemTypeEnum
    limit: number
    offset: number
}) => {
    try {
        const response = await api.item.getShopItems.$get({
            limit: args.limit,
            offset: args.offset,
            type: args.type,
        })
        const {
            data: { items, hasMore, nextOffset },
        } = await response.json()

        const creditCount = await api.payment.getCreditCount.$get()
        const {
            data: { creditCount: userCreditCount },
        } = await creditCount.json()

        const component = (
            <ShopGridView
                key={JSON.stringify(args)}
                hasMore={hasMore}
                nextOffset={nextOffset}
                items={items}
                creditCount={userCreditCount}
            />
        )

        return { component }
    } catch (error) {
        throw new Error(`❌ client.getShopItems failed with error: ${error}`)
    }
}

'use server'

import { client as api } from '@clients/api.client'
import { currentUser } from '@clerk/nextjs/server'
import { ItemTypeEnum } from '@client-types/item/item.model'
import { ShopGridView } from './_components/ShopGrid.view'
import { redirect } from 'next/navigation'

export const getShopItems = async (args: {
    type: ItemTypeEnum
    limit: number
    offset: number
}) => {
    try {
        const user = await currentUser()

        const response = await api.item.getShopItems.$get({
            userId: user.id,
            limit: args.limit,
            offset: args.offset,
            type: args.type,
        })
        const {
            data: { items, hasMore, nextOffset },
        } = await response.json()

        const creditCount = await api.payment.getCreditCount.$get({
            userId: user.id,
        })
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

export const purchaseItemFromShop = async (args: {
    itemId: number
    itemCost: number
}) => {
    try {
        const user = await currentUser()

        await api.payment.purchaseItemFromShop.$post({
            userId: user.id,
            itemId: args.itemId,
            itemCost: args.itemCost,
        })
    } catch (error) {
        throw new Error(
            `❌ client.purchaseItemFromShop failed with error: ${error}`,
        )
    }

    return redirect('/dashboard/shop?action=modal.item.purchased')
}

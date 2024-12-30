'use server'

import { client as api } from '@clients/api.client'
import { currentUser } from '@clerk/nextjs/server'

export const getShopItems = async () => {
    try {
        const user = await currentUser()

        const response = await api.item.getShopItems.$get({
            userId: user.id,
            limit: 30,
            offset: 0,
        })
        const {
            data: { items },
        } = await response.json()

        return { items }
    } catch (error) {
        throw new Error(`❌ client.getShopItems failed with error: ${error}`)
    }
}

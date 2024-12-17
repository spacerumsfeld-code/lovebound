'use server'

import { currentUser } from '@clerk/nextjs/server'
import { client as api } from '@clients/api.client'

export const getCreditCount = async () => {
    try {
        const user = await currentUser()

        const response = await api.payment.getCreditCount.$get({
            userId: user.id,
        })
        const data = await response.json()
        const { creditCount } = data.data

        return { creditCount }
    } catch (error) {
        console.error(`❌ client.getCreditCount error:`, error)
        throw new Error(
            `❌ client.getCreditCount error: ${JSON.stringify(error)}`,
        )
    }
}

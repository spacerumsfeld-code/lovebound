'use server'

import { currentUser } from '@clerk/nextjs/server'
import { client as api } from '@clients/api.client'

export const getCreditCount = async () => {
    try {
        const user = await currentUser()

        const response = await api.payment.getCreditCount.$get({
            userId: user.id,
        })

        const {
            data: { creditCount },
        } = await response.json()

        return { creditCount }
    } catch (error) {
        throw new Error(
            `❌ client.getCreditCount error: ${JSON.stringify(error)}`,
        )
    }
}

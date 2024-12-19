'use server'

import { getCurrentUser } from '../../../data'
import { client as api } from '@clients/api.client'

export const getCreditCount = async () => {
    try {
        const { user } = await getCurrentUser()

        const response = await api.payment.getCreditCount.$get({
            userId: user.id,
        })
        const data = await response.json()
        const { creditCount } = data.data

        return { creditCount }
    } catch (error) {
        throw new Error(
            `❌ client.getCreditCount error: ${JSON.stringify(error)}`,
        )
    }
}

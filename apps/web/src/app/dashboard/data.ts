import { client as api } from '@clients/api.client'
import { cache as dedupe } from 'react'

export const getRecentStories = async () => {
    try {
        const response = await api.story.getRecentStories.$get()
        const data = await response.json()
        const { recentStories } = data.data

        return { recentStories }
    } catch (error) {
        throw new Error(
            `❌ client.getRecentStories failed with error: ${error.message}`,
        )
    }
}

export const getCreditCount = dedupe(async () => {
    try {
        const response = await api.payment.getCreditCount.$get()
        const data = await response.json()

        const { creditCount } = data.data

        return { creditCount }
    } catch (error) {
        throw new Error(`❌ client.getCreditCount error: ${error.message}`)
    }
})

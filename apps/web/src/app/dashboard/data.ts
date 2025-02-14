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

export const getGettingStartedFields = dedupe(async () => {
    try {
        const response = await api.user.getGettingStartedFields.$get()
        const data = await response.json()
        const { gettingStartedFields } = data.data

        return {
            gettingStartedFields,
        }
    } catch (error) {
        throw new Error(
            `❌ client.getGettingStartedFields error: ${error.message}`,
        )
    }
})

export const getCurrentSubscriptionType = dedupe(async () => {
    try {
        const response = await api.user.getCurrentSubscriptionType.$get()
        const data = await response.json()
        const { currentSubscriptionType } = data.data
        console.info('currentSubscriptionType', currentSubscriptionType)

        return { currentSubscriptionType }
    } catch (error) {
        console.error(
            `❌ client.getCurrentSubscriptionType error: ${error.message}`,
        )
        throw new Error(
            `❌ client.getCurrentSubscriptionType error: ${error.message}`,
        )
    }
})

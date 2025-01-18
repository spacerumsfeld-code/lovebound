'use server'

import { client as api } from '@clients/api.client'
import { currentUser } from '@clerk/nextjs/server'
import { cache as dedupe } from 'react'

export const getRecentStories = async () => {
    try {
        const user = await currentUser()
        if (!user) return { recentStories: [] }

        const response = await api.story.getRecentStories.$get({
            userId: user.id,
        })
        const data = await response.json()
        const { recentStories } = data.data

        return { recentStories }
    } catch (error) {
        throw new Error(`client.getRecentStories failed with error: ${error}`)
    }
}

export const getCreditCount = dedupe(async () => {
    try {
        const user = await currentUser()
        if (!user) return { creditCount: 0 }

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
})

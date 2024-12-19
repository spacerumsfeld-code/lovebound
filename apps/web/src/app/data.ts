'use server'

import { currentUser } from '@clerk/nextjs/server'
import { cache as dedupe } from 'react'

export const getCurrentUser = dedupe(async () => {
    try {
        const user = await currentUser()

        return { user: user ?? null }
    } catch (error) {
        throw new Error(`❌ client.getUser failed with error: ${error}`)
    }
})

/**
 * @summary
 * We make this a distinct method from the other as certain User object fields are not serializable,
 * and thus cannot be used in the AnalyticsProvider.
 */
export const getCurrentUserId = async () => {
    try {
        const user = await currentUser()

        return { userId: user?.id ?? null }
    } catch (error) {
        throw new Error(`❌ client.getUserId failed with error: ${error}`)
    }
}

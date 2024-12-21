'use server'

import { currentUser } from '@clerk/nextjs/server'
import { cache as dedupe } from 'react'

export const getCurrentUser = dedupe(async () => {
    try {
        const user = await currentUser()

        return { user: user ?? null }
    } catch (error) {
        throw new Error(`❌ client.getCurrentUser failed with error: ${error}`)
    }
})

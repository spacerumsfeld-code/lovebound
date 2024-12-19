'use server'

import { currentUser } from '@clerk/nextjs/dist/types/server'
import { cache as dedupe } from 'react'

export const getCurrentUser = dedupe(async () => {
    try {
        const user = await currentUser()

        return { user: user ?? null }
    } catch (error) {
        throw new Error(`❌ client.getUser failed with error: ${error}`)
    }
})

'use server'

import { client as api } from '@clients/api.client'
import { currentUser } from '@clerk/nextjs/server'

export const getUserStories = async () => {
    const user = await currentUser()

    const response = await api.story.getUserStories.$get({ userId: user!.id })
    const { stories } = await response.json()
    return { stories }
}

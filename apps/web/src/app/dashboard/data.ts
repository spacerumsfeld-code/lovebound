import { currentUser } from '@clerk/nextjs/server'
import { client as api } from '@clients/api.client'

export const getRecentStories = async () => {
    const user = await currentUser()

    const response = await api.story.getRecentStories.$get({ userId: user!.id })
    const {
        data: { recentStories },
    } = await response.json()

    return { recentStories }
}

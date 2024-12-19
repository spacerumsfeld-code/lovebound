import { getCurrentUser } from '../data'
import { client as api } from '@clients/api.client'

export const getRecentStories = async () => {
    try {
        const { user } = await getCurrentUser()
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

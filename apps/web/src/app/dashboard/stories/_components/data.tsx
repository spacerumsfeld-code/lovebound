'use server'

import { client as api } from '@clients/api.client'
import { StoryGridView } from './StoryGrid.view'
import { getCurrentUser } from 'src/app/data'

export const getStories = async (args: {
    limit: number
    offset: number
    genre: number
    theme: number
}) => {
    try {
        const { user } = await getCurrentUser()

        const response = await api.story.getStories.$get({
            ...args,
            userId: user!.id,
        })
        const {
            data: { stories, hasMore, nextOffset },
        } = await response.json()

        const component = (
            <StoryGridView
                key={JSON.stringify(args)}
                storiesWithScenes={stories}
                hasMore={hasMore}
                nextOffset={nextOffset}
            />
        )

        return { component }
    } catch (error) {
        throw new Error(
            `client.getStories failed with ${JSON.stringify(error)}`,
        )
    }
}

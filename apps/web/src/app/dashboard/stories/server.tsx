'use server'

import { client as api } from '@clients/api.client'
import { StoryGridView } from './_components/StoryGrid.view'
import { TStoryWithScenes } from '@client-types/story/story.model'

export const getStories = async (args: {
    limit: number
    offset: number
    genre: number
    theme: number
}) => {
    try {
        const response = await api.story.getStories.$get({
            ...args,
        })
        const {
            data: { stories, hasMore, nextOffset },
        } = await response.json()

        const component = (
            <StoryGridView
                key={JSON.stringify(args)}
                storiesWithScenes={stories as unknown as TStoryWithScenes[]}
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

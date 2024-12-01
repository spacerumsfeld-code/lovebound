'use server'

import { client as api } from '@clients/api.client'
import { StoryGridView } from './StoryGrid.view'
import { currentUser } from '@clerk/nextjs/server'

export const getStories = async ({
    limit,
    offset,
}: {
    limit: number
    offset: number
}) => {
    const user = await currentUser()

    const response = await api.story.getStories.$get({
        limit,
        offset,
        userId: user!.id,
    })
    const {
        data: { stories },
        // hasMore, nextOffset.
    } = await response.json()

    const component = <StoryGridView key={offset} storyData={stories} />

    return { component }
}

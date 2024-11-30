'use server'

import { client as api } from '@clients/api.client'
import { StoryGridView } from './StoryGrid.view'

export const getStories = async (args: { userId: string }) => {
    const response = await api.story.getStories.$get({
        userId: args.userId,
    })
    const {
        data: { stories },
    } = await response.json()
    console.info('storyData from server function', JSON.stringify(stories))

    // make key=offset when we add that.
    const component = <StoryGridView key={args.userId} storyData={stories} />
    return { component }
}

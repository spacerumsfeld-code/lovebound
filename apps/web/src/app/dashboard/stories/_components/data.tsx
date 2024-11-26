'use server'

import { client as api } from '@clients/api.client'
import { StoryGridView } from './StoryGrid.view'

export const getUserStories = async (args: { userId: string }) => {
    const response = await api.story.getUserStories.$get({
        userId: args.userId,
    })
    const { stories } = await response.json()

    const component = <StoryGridView stories={stories} />
    return { component }
}

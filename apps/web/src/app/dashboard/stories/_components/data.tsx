'use server'

import { client as api } from '@clients/api.client'
import { StoryGridView } from './StoryGrid.view'
import { currentUser } from '@clerk/nextjs/server'
import { GenreEnum, ThemeEnum } from '@client-types/story/story.model'

export const getStories = async (args: {
    limit: number
    offset: number
    genre: GenreEnum
    theme: ThemeEnum
}) => {
    const user = await currentUser()

    const response = await api.story.getStories.$get({
        ...args,
        userId: user!.id,
    })
    const {
        data: { stories },
    } = await response.json()

    const component = (
        <StoryGridView key={JSON.stringify(args)} storyData={stories} />
    )

    return { component }
}

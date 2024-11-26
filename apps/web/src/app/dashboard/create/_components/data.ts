'use server'

import { currentUser } from '@clerk/nextjs/server'
import { TCreateStoryClient } from '@client-types/story/story.model'
import { client as api } from '@clients/api.client'
import { redirect } from 'next/navigation'

export const submitStory = async (data: TCreateStoryClient) => {
    try {
        const user = await currentUser()

        await api.story.submitStory.$post({
            ...data,
            ownerId: user!.id,
        })
    } catch (error) {
        console.error(error)
    }

    // return redirect('/dashboard?toast=story-submitted')
}

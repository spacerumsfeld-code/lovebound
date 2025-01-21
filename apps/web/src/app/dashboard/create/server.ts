'use server'

import { client as api } from '@clients/api.client'
import { redirect } from 'next/navigation'
import { TCreateStory } from '@client-types/story/story.model'

export const submitStory = async (data: TCreateStory) => {
    try {
        await api.story.submitStory.$post({
            ...data,
        })
    } catch (error) {
        throw new Error(`client.submitStory failed with error: ${error}`)
    }

    return redirect('/dashboard?action=modal.story.created')
}

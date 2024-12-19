'use server'

import { TCreateStoryClient } from '@client-types/story/story.model'
import { client as api } from '@clients/api.client'
import { redirect } from 'next/navigation'
import { getCurrentUser } from 'src/app/data'

export const submitStory = async (data: TCreateStoryClient) => {
    try {
        const { user } = await getCurrentUser()

        await api.story.submitStory.$post({
            ...data,
            ownerId: user!.id,
        })
    } catch (error) {
        throw new Error(`client.submitStory failed with error: ${error}`)
    }

    return redirect('/dashboard?action=modal.story.created')
}

export const getAllItems = async () => {
    try {
        const { user } = await getCurrentUser()

        const response = await api.item.getAllItems.$get({
            userId: user!.id,
        })
        const {
            data: { genres, themes, lengths, tensionLevels, settings, tones },
        } = await response.json()

        return { genres, themes, lengths, tensionLevels, settings, tones }
    } catch (error) {
        throw new Error(`client.getAllItems failed with error: ${error}`)
    }
}

'use server'

import { TCreateStoryClient } from '@client-types/story/story.model'
import { client as api } from '@clients/api.client'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export const submitStory = async (data: TCreateStoryClient) => {
    try {
        const user = await currentUser()

        await api.story.submitStory.$post({
            ...data,
            ownerId: user!.id,
        })
    } catch (error) {
        throw new Error(`client.submitStory failed with error: ${error}`)
    }

    return redirect('/dashboard?action=modal.story.created')
}

export const getCreateStoryItems = async () => {
    try {
        const user = await currentUser()

        const response = await api.item.getCreateStoryItems.$get({
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

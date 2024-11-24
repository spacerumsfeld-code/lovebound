'use server'

import { currentUser } from '@clerk/nextjs/server'
import { client as api } from '@clients/api.client'
import { TensionEnum, ThemeEnum, ToneEnum } from '@core'

export const submitStory = async (data: {
    scenario: string | null
    selectedTheme: ThemeEnum
    selectedTone: ToneEnum
    selectedSetting: string
    tension: TensionEnum
    storyTitle: string | null
}) => {
    try {
        const user = await currentUser()
        console.info('1 submitStory')

        const response = await api.story.submitStory.$post({
            ...data,
            userId: user!.id,
        })
        console.info('response', response)

        return response
    } catch (error) {
        console.error(error)
    }
}

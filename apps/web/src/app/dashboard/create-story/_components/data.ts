'use server'

import { currentUser } from '@clerk/nextjs/server'
import { LengthEnum } from '@client-types/story/story.model'
import { client as api } from '@clients/api.client'
import { SettingEnum, TensionEnum, ThemeEnum, ToneEnum } from '@core'
import { redirect } from 'next/navigation'

export const submitStory = async (data: {
    scenario: string | null
    selectedTheme: ThemeEnum
    selectedTone: ToneEnum
    selectedSetting: SettingEnum
    tension: TensionEnum
    storyTitle: string
    includeNarration: boolean
    length: LengthEnum
}) => {
    try {
        const user = await currentUser()

        await api.story.submitStory.$post({
            ...data,
            userId: user!.id,
        })
    } catch (error) {
        console.error(error)
    }

    return redirect('/dashboard?toast=story-submitted')
}

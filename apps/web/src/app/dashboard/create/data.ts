import { client as api } from '@clients/api.client'
import { currentUser } from '@clerk/nextjs/server'

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
        throw new Error(
            `client.getCreateStoryItems failed with error: ${error}`,
        )
    }
}

import { getCreateStoryItems } from '../data'
import { CreateStoryView } from './CreateStory.view'

export const CreateStoryPage = async () => {
    const { genres, themes, lengths, tensionLevels, settings, tones } =
        await getCreateStoryItems()

    return (
        <CreateStoryView
            items={{ genres, themes, lengths, tensionLevels, settings, tones }}
        />
    )
}

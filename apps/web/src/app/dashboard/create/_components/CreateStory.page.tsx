import { getCreateStoryItems } from '../data'
import { CreateStoryView } from './CreateStory.view'

export const CreateStoryPage = async () => {
    // *Data
    const { genres, themes, lengths, tensionLevels, settings, tones } =
        await getCreateStoryItems()

    // *Render
    return (
        <CreateStoryView
            items={{ genres, themes, lengths, tensionLevels, settings, tones }}
        />
    )
}

import { getAllItems } from '../data'
import { CreateStoryView } from './CreateStory.view'

export const CreateStoryPage = async () => {
    const { genres, themes, lengths, tensionLevels, settings, tones } =
        await getAllItems()

    return (
        <CreateStoryView
            items={{ genres, themes, lengths, tensionLevels, settings, tones }}
        />
    )
}

import { getAllItems } from '../data.ts'
import { CreateStoryView } from './CreateStory.view.tsx'

export const CreateStoryPage = async () => {
    const { genres, themes, lengths, tensionLevels, settings, tones } =
        await getAllItems()

    return (
        <CreateStoryView
            items={{ genres, themes, lengths, tensionLevels, settings, tones }}
        />
    )
}

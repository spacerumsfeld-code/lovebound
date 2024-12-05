import { getAllItems } from '../data.ts'
import { CreateStoryView } from './CreateStory.view.tsx'

export const CreateStoryPage = async () => {
    const { genres, themes, lengths } = await getAllItems()

    return <CreateStoryView genres={genres} themes={themes} lengths={lengths} />
}

import { GenreEnum, ThemeEnum } from '@client-types/story/story.model'
import { getStories } from './data'

export const StoryGridAsync = async ({
    args,
}: {
    args: {
        limit: number
        offset: number
        genre: GenreEnum
        theme: ThemeEnum
    }
}) => {
    const { component } = await getStories(args)

    return component
}

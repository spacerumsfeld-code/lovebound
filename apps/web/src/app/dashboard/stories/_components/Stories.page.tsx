import { GenreEnum, ThemeEnum } from '@client-types/story/story.model'
import { StoryGrid } from './StoryGrid'

export const StoriesPage = async (props: {
    searchParams: Record<string, string>
}) => {
    const args = {
        limit: 20,
        offset: 0,
        genre: (props.searchParams?.genre as GenreEnum) ?? GenreEnum.None,
        theme: (props.searchParams?.theme as ThemeEnum) ?? ThemeEnum.None,
    }

    // @Render
    return <StoryGrid args={args} />
}

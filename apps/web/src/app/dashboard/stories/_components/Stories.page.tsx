import { getFilterItems } from '../data'
import { StoriesHeader } from './Stories.header'
import { StoryGrid } from './StoryGrid'

export const StoriesPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const { genre, theme } = await searchParams
    const args = {
        limit: 16,
        offset: 0,
        genre: genre ? Number(genre) : 0,
        theme: theme ? Number(theme) : 0,
    }
    const { genres: genreFilters, themes: themeFilters } =
        await getFilterItems()

    // *Render
    return (
        <>
            <StoriesHeader
                genre={args.genre}
                theme={args.theme}
                genreFilters={genreFilters}
                themeFilters={themeFilters}
            />
            <StoryGrid args={args} />
        </>
    )
}

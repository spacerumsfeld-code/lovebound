import { StoryGrid } from './StoryGrid'

export const StoriesPage = async (props: {
    searchParams: Record<string, string>
}) => {
    const args = {
        limit: 16,
        offset: 0,
        genre: Number(props.searchParams?.genre ?? 0),
        theme: Number(props.searchParams?.theme ?? 0),
    }

    // @Render
    return <StoryGrid args={args} />
}

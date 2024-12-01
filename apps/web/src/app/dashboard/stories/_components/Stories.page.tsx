import { StoryGrid } from './StoryGrid'

export const StoriesPage = async ({
    searchParams,
}: {
    [key: string]: string
}) => {
    // @Data
    const args = {
        limit: 20,
        offset: 0,
    }

    console.info(searchParams)
    // @Render
    return <StoryGrid args={args} />
}

import { currentUser } from '@clerk/nextjs/server'
import { StoryGrid } from './StoryGrid'

export const StoriesPage = async ({
    searchParams,
}: {
    [key: string]: string
}) => {
    // @Data
    const user = await currentUser()
    const args = {
        userId: user!.id,
    }

    console.info(searchParams)
    // @Render
    return <StoryGrid args={args} />
}

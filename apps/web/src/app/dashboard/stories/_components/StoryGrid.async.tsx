import { getStories } from './data'

export const StoryGridAsync = async ({
    args,
}: {
    args: {
        limit: number
        offset: number
    }
}) => {
    const { component } = await getStories(args)

    return component
}

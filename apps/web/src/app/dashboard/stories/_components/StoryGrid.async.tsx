import { getStories } from './data'

export const StoryGridAsync = async ({
    args,
}: {
    args: {
        userId: string
    }
}) => {
    const { component } = await getStories({ userId: args.userId })

    return component
}

import { getUserStories } from './data'

export const StoryGridAsync = async ({
    args,
}: {
    args: {
        userId: string
    }
}) => {
    const { component } = await getUserStories(args)

    return component
}

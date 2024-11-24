import { getUserStories } from './_components/data'
import { StoryGrid } from './_components/StoryGrid'

export default async function StoriesPage() {
    const { stories } = await getUserStories()

    if (!stories.length) {
        return <div>No stories yet</div>
    }

    return <StoryGrid stories={stories} />
}

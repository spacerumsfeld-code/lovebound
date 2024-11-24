import { getUserStories } from './_components/data'

export default async function StoriesPage() {
    const { stories } = await getUserStories()

    if (stories.length) {
        return <div>WOW</div>
    }

    return <div>Stories</div>
}

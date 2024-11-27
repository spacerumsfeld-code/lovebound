// {
//     /* <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"></div> */
// }

import { TStory } from '@client-types/story/story.model'
import { StoryCard } from './StoryCard'

export const StoryGridView = ({
    stories,
}: {
    stories: Omit<TStory, 'theme' | 'genre' | 'ownerId' | 'length'>[]
}) => {
    if (!stories.length) {
        return <div>No stories yet</div>
    }
    return (
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {stories.map((story) => (
                <StoryCard
                    key={story.id}
                    title={story.title}
                    imageUrl={
                        story?.coverUrl ??
                        process.env.NEXT_PUBLIC_PLACEHOLDER_COVER_URL!
                    }
                />
            ))}
        </div>
    )
}

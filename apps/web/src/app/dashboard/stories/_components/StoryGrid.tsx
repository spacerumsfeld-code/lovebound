import { TStory } from '@client-types/story/story.model'
import { StoryCard } from './StoryCard'

export const StoryGrid = ({ stories }: { stories: TStory[] }) => {
    return (
        <div className=" p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stories.map((story) => (
                <StoryCard
                    key={story.id}
                    title={story.title}
                    imageUrl={story.coverUrl ?? undefined}
                />
            ))}
        </div>
    )
}

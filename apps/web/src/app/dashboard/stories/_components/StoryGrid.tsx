import { StoryCard } from './StoryCard'

export const StoryGrid = ({ stories }: { stories: any[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stories.map((story) => (
                <StoryCard
                    key={story.id}
                    title={story.title}
                    author={story.ownerId}
                    // imageUrl={story.coverImageUrl}
                />
            ))}
        </div>
    )
}

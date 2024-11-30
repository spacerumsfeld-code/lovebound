import { TStoryWithScenes } from '@client-types/story/story.model'
import { StoryCard } from './StoryCard'
import React from 'react'

export const StoryGridView = ({
    storyData,
}: {
    storyData: TStoryWithScenes[]
}) => {
    if (!storyData?.length) {
        return <div>No stories yet</div>
    }

    return (
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {storyData.map((story) => (
                <StoryCard key={story.id} story={story} />
            ))}
        </div>
    )
}

import { TStoryWithScenes } from '@client-types/story/story.model'
import { StoryCard } from './StoryCard'
import React from 'react'
import { LoadMore } from './LoadMore'

export const StoryGridView = ({
    storiesWithScenes,
    hasMore,
    nextOffset,
}: {
    storiesWithScenes: TStoryWithScenes[]
    hasMore: boolean
    nextOffset: number
}) => {
    if (!storiesWithScenes?.length) {
        return <div className="p-8">No stories yet</div>
    }

    return (
        <>
            <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {storiesWithScenes.map((story) => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>
            {hasMore && <LoadMore nextOffset={nextOffset} />}
        </>
    )
}

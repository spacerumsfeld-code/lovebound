import { StoryGridFilters } from './StoryGrid.filters'
import { Suspense } from 'react'
import { StoryGridAsync } from './StoryGrid.async'
import { StoryGridSkeleton } from './StoryGrid.skeleton'

export const StoryGrid = ({
    args,
}: {
    args: {
        limit: number
        offset: number
    }
}) => {
    return (
        <main>
            <StoryGridFilters />
            <Suspense
                key={args.offset}
                fallback={<StoryGridSkeleton size={12} />}
            >
                <StoryGridAsync args={args} />
            </Suspense>
        </main>
    )
}

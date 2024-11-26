import { StoryGridFilters } from './StoryGrid.filters'
import { Suspense } from 'react'
import { StoryGridAsync } from './StoryGrid.async'

export const StoryGrid = ({
    args,
}: {
    args: {
        userId: string
    }
}) => {
    return (
        <main>
            <StoryGridFilters />
            <Suspense key={args.userId} fallback={<div>Loading...</div>}>
                <StoryGridAsync args={args} />
            </Suspense>
        </main>
    )
}

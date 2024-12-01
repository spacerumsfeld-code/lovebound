import { StoryGridFilters } from './StoryGrid.filters'
import { Suspense } from 'react'
import { StoryGridAsync } from './StoryGrid.async'
import { StoryGridSkeleton } from './StoryGrid.skeleton'
import { GenreEnum, ThemeEnum } from '@client-types/story/story.model'

export const StoryGrid = ({
    args,
}: {
    args: {
        limit: number
        offset: number
        genre: GenreEnum
        theme: ThemeEnum
    }
}) => {
    return (
        <main className="p-8">
            <StoryGridFilters genre={args.genre} theme={args.theme} />
            <Suspense
                key={JSON.stringify(args)}
                fallback={<StoryGridSkeleton size={12} />}
            >
                <StoryGridAsync args={args} />
            </Suspense>
        </main>
    )
}

'use client'

import { Button } from '@web/src/components/ui/buttonTwo'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { GenreEnum, ThemeEnum } from '@client-types/story/story.model'
import { useState } from 'react'
import useLoading from '@web/src/hooks/use-loading'
import { getStories } from './data'

export const LoadMore = (props: { nextOffset: number }) => {
    // @State
    const [component, setComponent] = useState<JSX.Element | null>(null)
    const params = useSearchParams()
    const theme = params.get('theme') ?? (ThemeEnum.None as ThemeEnum)
    const genre = params.get('genre') ?? (GenreEnum.None as GenreEnum)
    const args = {
        limit: 28,
        offset: props.nextOffset,
        theme: theme as ThemeEnum,
        genre: genre as GenreEnum,
    }
    const { isLoading, startLoading, stopLoading } = useLoading()

    // @Interactivity
    const handleLoadMore = async () => {
        startLoading('loadMoreStories')
        const { component: newComponent } = await getStories(args)
        setComponent(newComponent)
        stopLoading('loadMoreStories')
    }

    // @Render
    return (
        <>
            {component ? (
                component
            ) : (
                <div className="flex flex-col mx-auto gap-y-2 w-full items-center py-8">
                    <Button
                        onClick={() => handleLoadMore()}
                        className="bg-[#B76E79] hover:bg-[#C88591] text-white"
                    >
                        {isLoading('loadMoreStories') ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <div>Load More</div>
                        )}
                    </Button>
                </div>
            )}
        </>
    )
}

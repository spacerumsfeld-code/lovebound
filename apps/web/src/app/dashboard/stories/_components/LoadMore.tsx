'use client'

import { Button } from '../../../../components/ui/button'
import { useSearchParams } from 'next/navigation'
import { ChevronDown, Loader2 } from 'lucide-react'
import { JSX, useState } from 'react'
import useLoading from '../../../../hooks/use-loading'
import { getStories } from '../server'

export const LoadMore = (props: { nextOffset: number }) => {
    // @State
    const [component, setComponent] = useState<JSX.Element | null>(null)
    const params = useSearchParams()
    const theme = Number(params.get('theme') ?? 0)
    const genre = Number(params.get('genre') ?? 0)
    const args = {
        limit: 28,
        offset: props.nextOffset,
        theme,
        genre,
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
                        variant="primary"
                        disabled={isLoading('loadMoreStories')}
                        onClick={() => handleLoadMore()}
                        className="flex items-center justify-center"
                    >
                        {isLoading('loadMoreStories') ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <ChevronDown className="mr-2 h-4 w-4" />
                        )}
                        Load More
                    </Button>
                </div>
            )}
        </>
    )
}

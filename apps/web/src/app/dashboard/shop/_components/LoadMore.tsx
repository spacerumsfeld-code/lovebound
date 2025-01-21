'use client'

import { Button } from 'src/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { Loader2, ChevronDown } from 'lucide-react'
import { JSX, useState } from 'react'
import useLoading from 'src/hooks/use-loading'
import { getShopItems } from '../server'
import { ItemTypeEnum } from '@client-types/item/item.model'

export const LoadMore = (props: { nextOffset: number }) => {
    // @State
    const [component, setComponent] = useState<JSX.Element | null>(null)
    const params = useSearchParams()
    const type = (params.get('type') ?? ItemTypeEnum.None) as ItemTypeEnum
    const args = {
        limit: 12,
        offset: props.nextOffset,
        type,
    }
    const { isLoading, startLoading, stopLoading } = useLoading()

    // @Interactivity
    const handleLoadMore = async () => {
        startLoading('loadMoreStories')
        const { component: newComponent } = await getShopItems(args)
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

import { Suspense } from 'react'
import { SubscriptionCTAAsync } from './SubscriptionCTA.async'
import { Skeleton } from 'src/components/ui/skeleton'

export const SubscriptionCTA = () => {
    // *Render
    return (
        <Suspense fallback={<Skeleton className="h-8 w-16" />}>
            <SubscriptionCTAAsync />
        </Suspense>
    )
}

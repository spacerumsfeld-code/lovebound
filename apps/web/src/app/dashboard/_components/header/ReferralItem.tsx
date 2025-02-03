import { Suspense } from 'react'
import { ReferralItemAsync } from './ReferralItem.async'
import { ReferralItemFallback } from './ReferralItem.fallback'

export const ReferralItem = () => {
    // *Render
    return (
        <Suspense fallback={<ReferralItemFallback />}>
            <ReferralItemAsync />
        </Suspense>
    )
}

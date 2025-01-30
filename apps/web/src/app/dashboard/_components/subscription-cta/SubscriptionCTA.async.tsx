import Link from 'next/link'
import { getCurrentSubscriptionType } from '../../data'
import { ProductTypeEnum } from '@client-types/payment/payment.model'
import { SITE_MAP } from 'src/constants'
import { Sparkles } from 'lucide-react'

export const SubscriptionCTAAsync = async () => {
    // *Data
    const { currentSubscriptionType } = await getCurrentSubscriptionType()

    // *Render
    let ctaText
    switch (currentSubscriptionType) {
        case null:
            ctaText = 'Upgrade to a subscription'
            break
        case ProductTypeEnum.CasualSubscription:
            ctaText = 'Upgrade to Premium Subscription'
            break
        case ProductTypeEnum.PremiumSubscription:
            ctaText = 'Current subscription: Premium'
            break
    }

    return (
        <Link
            href={SITE_MAP.UPGRADE}
            className="flex justify-center items-center text-indigo-400"
        >
            <div>
                <Sparkles className="inline-block mr-2" />
            </div>
            <span className="hidden sm:block ">{ctaText}</span>
            <span className="sm:hidden">Upgrade</span>
        </Link>
    )
}

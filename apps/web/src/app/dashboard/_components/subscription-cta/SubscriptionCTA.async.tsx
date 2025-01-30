import Link from 'next/link'
import { getCurrentSubscriptionType } from '../../data'
import { ProductTypeEnum } from '@client-types/payment/payment.model'
import { SITE_MAP } from 'src/constants'
import { Sparkles } from 'lucide-react'

export const SubscriptionCTAAsync = async () => {
    // *Data
    const { currentSubscription } = await getCurrentSubscriptionType()

    // *Render
    let ctaText
    switch (currentSubscription) {
        case null:
            ctaText = 'Upgrade to a subscription for more features'
            break
        case ProductTypeEnum.CasualSubscription:
            ctaText =
                'Upgrade to a Premium Subscription for audio narration and more'
            break
        case ProductTypeEnum.PremiumSubscription:
            ctaText = 'Current subscription: Premium'
            break
    }

    return (
        <Link
            href={SITE_MAP.UPGRADE}
            className="flex justify-center items-center"
        >
            <div>
                <Sparkles className="inline-block mr-2 text-indigo-400" />
            </div>
            <span className="hidden sm:block ">{ctaText}</span>
            <span className="sm:hidden text-indigo-400">Upgrade</span>
        </Link>
    )
}

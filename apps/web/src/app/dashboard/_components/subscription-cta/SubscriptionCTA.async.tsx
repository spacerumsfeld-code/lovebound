import Link from 'next/link'
import { getCurrentSubscriptionType } from '../../data'
import { SITE_MAP } from 'src/constants'
import { Sparkles } from 'lucide-react'

export const SubscriptionCTAAsync = async () => {
    // *Data
    const { currentSubscriptionType } = await getCurrentSubscriptionType()

    // *Render
    let ctaText
    switch (currentSubscriptionType) {
        case null:
            ctaText = 'Get a Creator Pass for more features'
            break
        default:
            ctaText = 'Creator Pass active'
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

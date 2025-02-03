import { ArrowRight, Circle } from 'lucide-react'

export const ReferralItemFallback = () => {
    return (
        <div className="flex items-center gap-4 group p-4 border rounded-lg hover:bg-purple-50 transition-colors relative">
            <div className="flex-shrink-0">
                <Circle
                    className="h-5 w-5 text-gray-300 stroke-2"
                    strokeWidth={2}
                />
            </div>
            <div className="flex-grow">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Refer a Friend
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Use your referral code to earn more credits for you and a
                    friend! Click this box to copy your referral code if you
                    have not used it yet.
                </p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </div>
    )
}

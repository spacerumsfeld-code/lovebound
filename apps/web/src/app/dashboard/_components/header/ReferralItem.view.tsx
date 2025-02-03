'use client'

import { ArrowRight, Circle } from 'lucide-react'
import { useToast } from 'src/hooks/use-toast'

export const ReferralItemInteractive = (props: { code: string }) => {
    // * Interactivity
    const { showToast } = useToast()

    const handleClick = () => {
        navigator.clipboard.writeText(props.code)
        showToast(
            '✅ Referral code copied to clipboard. Share with your friend!',
        )
    }

    // *Render
    return (
        <div
            className="flex items-center gap-4 cursor-pointer group p-4 border rounded-lg hover:bg-purple-50 transition-colors relative"
            onClick={() => handleClick()}
        >
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
                    friend! Click this box to copy your referral code to share.
                </p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </div>
    )
}

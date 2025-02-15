import { ArrowRight, CheckCircle } from 'lucide-react'
import { getGettingStartedFields } from '../../data'
import { ReferralItemInteractive } from './ReferralItem.view'

export const ReferralItemAsync = async () => {
    // *Data
    const { gettingStartedFields } = await getGettingStartedFields()

    //* Render
    if (gettingStartedFields.gettingStartedReferralUsed.used) {
        return (
            <div className="group p-4 border rounded-lg hover:bg-purple-50 transition-colors relative">
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                        <CheckCircle
                            className="h-5 w-5 text-green-300 stroke-2"
                            strokeWidth={2}
                        />
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                            Refer a Friend
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Use your referral code to earn more credits for you
                            and a friend!
                        </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </div>
            </div>
        )
    }

    return (
        <ReferralItemInteractive
            code={gettingStartedFields.gettingStartedReferralUsed.code!}
        />
    )
}

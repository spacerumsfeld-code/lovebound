import { Button } from '../../../../components/ui/button'
import { Coins } from 'lucide-react'
import { CreditDisplayCount } from './CreditDisplayCount'
import { Suspense } from 'react'
import { Skeleton } from '../../../../components/ui/skeleton'

export const CreditDisplay = () => {
    // @Render
    return (
        <div className="space-y-4">
            <div className="rounded-lg bg-gradient-to-b from-purple-50 to-purple-100 p-4 dark:from-purple-900/20 dark:to-purple-900/10">
                <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1">
                        <Coins className="dark:from-purple-900/20 dark:to-purple-900/10" />
                        <Suspense
                            fallback={
                                <Skeleton className="bg-indigo-300 h-6 w-4 text-xl font-semibold" />
                            }
                        >
                            <CreditDisplayCount />
                        </Suspense>
                    </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Credits available
                </p>
                <p className="mt-2 text-sm font-medium">Need more?</p>
                <Button
                    href="/dashboard/upgrade"
                    className="mt-3 w-full text-white bg-indigo-400 hover:bg-indigo-300"
                >
                    Purchase
                </Button>
            </div>
        </div>
    )
}

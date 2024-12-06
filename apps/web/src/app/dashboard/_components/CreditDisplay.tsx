import React from 'react'
import { Button } from '@web/src/components/ui/button'
import { Coins } from 'lucide-react'
import Link from 'next/link'

export const CreditDisplay = () => {
    // @Data
    // get user credit count
    // .data method to "getUserBalance" which will be user service method.
    // easy to keep count up to date due to continual refresh and purchases being redirects.

    // @Render
    return (
        <div className="space-y-4">
            <div className="rounded-lg bg-gradient-to-b from-purple-50 to-purple-100 p-4 dark:from-purple-900/20 dark:to-purple-900/10">
                <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1">
                        <Coins className="dark:from-purple-900/20 dark:to-purple-900/10" />
                        <span className="text-xl font-semibold">3</span>
                    </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Credits available
                </p>
                <p className="mt-2 text-sm font-medium">Need more?</p>
                <Button
                    as={Link}
                    href="/dashboard/upgrade"
                    className="mt-3 w-full text-white bg-indigo-500 hover:bg-indigo-400"
                >
                    Purchase
                </Button>
            </div>
        </div>
    )
}

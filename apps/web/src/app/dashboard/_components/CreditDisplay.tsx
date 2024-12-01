import React from 'react'
import { Button } from '@web/src/components/ui/button'
import { Coins } from 'lucide-react'

export const CreditDisplay = () => {
    // @Data
    // get user credit count

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

                {/* Separate component for use client functionality */}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Credits available
                </p>
                <p className="mt-2 text-sm font-medium">Need more?</p>
                <Button className="mt-3 w-full bg-purple-500 hover:bg-purple-600">
                    Purchase
                </Button>
            </div>
        </div>
    )
}

'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import { BackgroundGradient } from 'src/components/ui/background-gradient'
import { Button } from 'src/components/ui/button'
import { SITE_MAP } from 'src/constants'

export default function GlobalError({
    error,
}: {
    error: Error & { digest?: string }
}) {
    // @Sentry
    useEffect(() => {
        Sentry.captureException(error)
    }, [error])

    // @Render
    return (
        <div className="h-screen w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-8 bg-white dark:bg-zinc-900">
                <div className="flex flex-col gap-4 items-center">
                    <div className="text-center">
                        <p className="sm:text-2xl font-bold">Whoops!</p>
                        <p className="text-md text-muted-foreground">
                            Something went wrong. Let&apos;s get you back to the
                            dashboard.
                        </p>
                    </div>
                    <Button
                        href={SITE_MAP.DASHBOARD}
                        className="w-full bg-indigo-400 text-white"
                    >
                        Go home
                    </Button>
                </div>
            </BackgroundGradient>
        </div>
    )
}

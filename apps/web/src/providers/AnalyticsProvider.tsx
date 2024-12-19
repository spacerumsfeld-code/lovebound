'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { use, useEffect } from 'react'

if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: '/api/posthog',
        ui_host: 'https://us.posthog.com',
    })
}

export function AnalyticsProvider(props: {
    promise: Promise<any>
    children: React.ReactNode
}) {
    const { userId } = use(props.promise)

    useEffect(() => {
        if (userId && !posthog._isIdentified()) {
            posthog.identify(userId)
        }

        return () => {
            posthog.reset()
        }
    }, [userId])

    return <PostHogProvider client={posthog}>{props.children}</PostHogProvider>
}

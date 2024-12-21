/**
 * @summary
 * Posthog for in-app analytics.
 * We handle identification of users here as using Clerk leaves no
 * ergonomic way of calling posthog "identify" and "reset" in its auth flow.
 */

'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export const PHProvider = (props: {
    userId: string | null
    children: React.ReactNode
}) => {
    // @Interactivity
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
            api_host: '/api/posthog',
            ui_host: 'https://us.posthog.com',
            loaded: () => {
                const isLoggedIn = Boolean(props.userId)
                const isIdentified = posthog._isIdentified()

                if (isLoggedIn && !isIdentified) posthog.identify(props.userId)
                else if (!isLoggedIn && isIdentified) posthog.reset()
            },
        })

        return () => {
            posthog.reset()
        }
    }, [])

    // @Render
    return <PostHogProvider client={posthog}>{props.children}</PostHogProvider>
}

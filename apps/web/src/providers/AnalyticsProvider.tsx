'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { getCurrentUser } from '../app/data'
import { use, useEffect } from 'react'

if (typeof window !== 'undefined') {
    if (process.env.ENVIRONMENT === 'production') {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        })
    }
}

interface CSPostHogProviderProps {
    children: React.ReactNode
}

export function AnalyticsProvider({ children }: CSPostHogProviderProps) {
    const { user } = use(getCurrentUser())

    if (user && !posthog._isIdentified()) {
        posthog.identify(String(user.id), {
            // email: user.email as string,
        })
    }

    useEffect(() => {
        return () => {
            posthog.reset()
        }
    }, [user])

    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

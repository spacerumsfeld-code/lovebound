'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import SuspendedPostHogPageView from 'src/components/ui/ph-pageview'
import { useEffect } from 'react'
import { EnvironmentEnum } from 'src/constants'

export const AnalyticsProvider = (props: { children: React.ReactNode }) => {
    useEffect(() => {
        if (
            process.env.NEXT_PUBLIC_ENVIRONMENT === EnvironmentEnum.PRODUCTION
        ) {
            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
                capture_pageview: false,
                api_host: '/api/posthog',
                ui_host: 'https://us.posthog.com',
            })
        }
    }, [])

    return (
        <PHProvider client={posthog}>
            <SuspendedPostHogPageView />
            {props.children}
        </PHProvider>
    )
}

'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { usePostHog } from 'posthog-js/react'
import { EnvironmentEnum } from 'src/constants'

function PostHogPageView() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const posthog = usePostHog()

    useEffect(() => {
        if (
            pathname &&
            posthog &&
            process.env.NEXT_PUBLIC_ENVIRONMENT === EnvironmentEnum.PRODUCTION
        ) {
            let url = window.origin + pathname
            if (searchParams.toString()) {
                url = url + `?${searchParams.toString()}`
            }
            posthog.capture('$pageview', { $current_url: url })
        }
    }, [pathname, searchParams, posthog])

    return null
}

// Wrap this in Suspense to avoid the `useSearchParams` usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
export default function SuspendedPostHogPageView() {
    return (
        <Suspense fallback={null}>
            <PostHogPageView />
        </Suspense>
    )
}

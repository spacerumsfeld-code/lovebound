import type {} from '../.sst/platform/config'

import { server } from './server'
import { allSecrets, secret } from './secret'
import { websocket } from './websocket'
import { type NextjsArgs } from '../.sst/platform/src/components/aws'
import { isProduction } from './stage'
import { bucket } from './bucket'

const webConfig: NextjsArgs = {
    link: [server, bucket, websocket, ...allSecrets],
    path: 'apps/web',
    dev: {
        autostart: true,
        command: 'pnpm run dev',
    },
    /**
     * @summary
     * This has been found to be the simplest and most reliable way to get secrets
     * injected into the runtime, middleware, etc. of the Next.js project.
     */
    environment: {
        WEB_URL: secret.WebUrl.value,
        SENTRY_DSN: secret.SentryDsn.value,
        NEXT_PUBLIC_ENVIRONMENT: secret.Environment.value,
        NEXT_PUBLIC_CRISP_WEBSITE_ID: secret.CrispWebsiteId.value,
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: secret.ClerkPublishableKey.value,
        NEXT_PUBLIC_WEBSOCKET_URL: websocket.url,
        NEXT_PUBLIC_POSTHOG_KEY: secret.PosthogKey.value,
        CLERK_SECRET_KEY: secret.ClerkSecretKey.value,
        CLERK_ENCRYPTION_KEY: secret.ClerkEncryptionKey.value,
        STRIPE_BILLING_DASHBOARD_URL: secret.StripeBillingDashboardUrl.value,
        SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING: '1',
    },
}

if (isProduction) {
    webConfig.domain = {
        name: 'lovebound.io',
        redirects: ['www.lovebound.io'],
    }
}

export const web = new sst.aws.Nextjs('Web', webConfig)

export const outputs = {
    webUrl: web.url,
}

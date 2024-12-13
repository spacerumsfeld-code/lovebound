/// <reference path="../.sst/platform/config.d.ts" />

import { server } from './server'
import { allSecrets, secret } from './secret'
import { websocket } from './websocket'
import { type NextjsArgs } from '../.sst/platform/src/components/aws'
import { isProduction } from './stage'

const webConfig: NextjsArgs = {
    link: [server, websocket, ...allSecrets],
    path: 'apps/web',
    dev: {
        autostart: true,
        command: 'pnpm run dev',
    },
    /**
     * @summary
     * We have had some issues accessing secrets in the edge runtime, so I am
     * instantiating all of them here until the issue is resolved. This ensures
     * they are rolled into the NextJS build and included where we need them.
     */
    environment: {
        WEB_URL: secret.WebUrl.value,
        NEXT_PUBLIC_CRISP_WEBSITE_ID: secret.CrispWebsiteId.value,
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: secret.ClerkPublishableKey.value,
        NEXT_PUBLIC_WEBSOCKET_URL: websocket.url,
        CLERK_SECRET_KEY: secret.ClerkSecretKey.value,
        CLERK_ENCRYPTION_KEY: secret.ClerkEncryptionKey.value,
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

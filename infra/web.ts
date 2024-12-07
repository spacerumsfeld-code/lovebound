/// <reference path="../.sst/platform/config.d.ts" />

import { server } from './server'
import { secret } from './secret'
import { websocket } from './websocket'
import { type NextjsArgs } from '../.sst/platform/src/components/aws'

const webConfig: NextjsArgs = {
    link: [server, websocket, secret.CrispWebsiteId],
    path: 'apps/web',
    dev: {
        autostart: true,
        command: 'pnpm run dev',
    },
}

if (process.env.PULUMI_NODEJS_STACK === 'production') {
    webConfig.domain = {
        name: 'lovebound.io',
        redirects: ['www.lovebound.io'],
    }
}

export const web = new sst.aws.Nextjs('Web', webConfig)

export const outputs = {
    webUrl: web.url,
}

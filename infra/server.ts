/// <reference path="../.sst/platform/config.d.ts" />

import { queue } from './queue'
import { allSecrets } from './secret'
import { websocket } from './websocket'

export const server = new sst.aws.Function('Server', {
    handler: 'apps/server/index.handler',
    link: [...allSecrets, queue, websocket],
    url: true,
})

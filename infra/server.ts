/// <reference path="../.sst/platform/config.d.ts" />

import { orchestration } from './orchestration'
import { allSecrets } from './secret'
import { websocket } from './websocket'

export const server = new sst.aws.Function('Server', {
    handler: 'apps/server/index.handler',
    link: [...allSecrets, websocket, orchestration],
    url: true,
})

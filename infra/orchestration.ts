/// <reference path="../.sst/platform/config.d.ts" />

import { allSecrets } from './secret'
import { websocket } from './websocket'

export const orchestration = new sst.aws.Function('Orchestration', {
    handler: 'libs/functions/src/orchestration.handler',
    link: [...allSecrets, websocket],
    timeout: '5 minutes',
    url: true,
})

export const outputs = {
    orchestration: orchestration.url,
}

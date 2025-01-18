import type {} from '../.sst/platform/config'

import { allSecrets } from './secret'
import { websocket } from './websocket'
import { bucket } from './bucket'

export const orchestration = new sst.aws.Function('Orchestration', {
    handler: 'libs/functions/src/orchestration.handler',
    link: [...allSecrets, websocket, bucket],
    timeout: '5 minutes',
    url: true,
})

export const outputs = {
    orchestration: orchestration.url,
}

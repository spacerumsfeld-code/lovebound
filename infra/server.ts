/// <reference path="../.sst/platform/config.d.ts" />

import { queue } from './queue'
import { allSecrets } from './secret'

export const server = new sst.aws.Function('Server', {
    handler: 'apps/server/index.handler',
    link: [...allSecrets, queue],
    url: true,
})

export const outputs = {
    server: server.url,
}

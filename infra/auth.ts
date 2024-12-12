/// <reference path="../.sst/platform/config.d.ts" />

import { allSecrets } from './secret'
import { websocket } from './websocket'

export const authHandler = new sst.aws.Function('AuthHandler', {
    handler: 'libs/functions/src/auth.handler',
    link: [...allSecrets, websocket],
    url: true,
})

/// <reference path="../.sst/platform/config.d.ts" />

import { allSecrets } from './secret'

export const authHandler = new sst.aws.Function('AuthHandler', {
    handler: 'libs/functions/src/auth.handler',
    link: [...allSecrets],
    url: true,
})

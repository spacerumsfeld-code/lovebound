/// <reference path="../.sst/platform/config.d.ts" />

import { allSecrets } from './secret'
import { queue } from './queue'

export const authHandler = new sst.aws.Function('AuthHandler', {
    handler: 'libs/functions/src/auth.handler',
    link: [...allSecrets, queue],
    url: true,
})

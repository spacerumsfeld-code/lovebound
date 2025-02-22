import type {} from '../.sst/platform/config'

import { allSecrets } from './secret'
import { websocket } from './websocket'

export const stripeHandler = new sst.aws.Function('StripeHandler', {
    handler: 'libs/functions/src/stripe.handler',
    link: [...allSecrets, websocket],
    url: true,
})

export const outputs = {
    stripeHandler: stripeHandler.url,
}

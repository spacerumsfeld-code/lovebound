import type {} from '../.sst/platform/config'

import { allSecrets } from './secret'

export const websocket = new sst.aws.ApiGatewayWebSocket('WebsocketApi')

websocket.route('$connect', {
    handler: 'libs/functions/src/connect.handler',
    link: [...allSecrets, websocket],
})

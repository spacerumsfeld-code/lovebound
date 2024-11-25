/// <reference path="../.sst/platform/config.d.ts" />

export const websocket = new sst.aws.ApiGatewayWebSocket('WebsocketApi')
websocket.route('$connect', 'libs/functions/src/connect.handler')
websocket.route('$disconnect', 'libs/functions/src/disconnect.handler')

export const outputs = {
    websocketUrl: websocket.url,
}

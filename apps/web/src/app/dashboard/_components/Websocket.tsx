'use client'

import { useWebsocket } from '@web/src/hooks/use-ws'

export const Websocket = () => {
    console.info('websocket component rendered')
    useWebsocket(
        'wss://6555250mv7.execute-api.us-east-1.amazonaws.com/$default',
    )

    return <></>
}

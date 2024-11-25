'use client'

import { useWebsocket } from '@web/src/hooks/use-ws'

export const Websocket = (props: { userId: string }) => {
    console.info('WEBSOCKET URL', process.env.NEXT_PUBLIC_WEBSOCKET_URL!)
    useWebsocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!, props.userId)

    return <></>
}

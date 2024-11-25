'use client'

import { useWebsocket } from '@web/src/hooks/use-ws'

export const Websocket = (props: { userId: string }) => {
    useWebsocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!, props.userId)

    return <></>
}

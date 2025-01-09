import { Websocket } from './Websocket'
import { currentUser } from '@clerk/nextjs/server'

export const WebsocketWrapper = async () => {
    // @Data
    const user = await currentUser()

    // @Render
    return <Websocket userId={user?.id ?? ''} />
}

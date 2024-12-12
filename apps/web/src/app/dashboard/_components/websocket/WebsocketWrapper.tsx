import { currentUser } from '@clerk/nextjs/server'
import { Websocket } from './Websocket'

export const WebsocketWrapper = async () => {
    // @Data
    const user = await currentUser()

    // @Render
    return <Websocket userId={user?.id ?? ''} />
}

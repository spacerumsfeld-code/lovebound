import { Websocket } from './Websocket'
import { getCurrentUser } from 'src/app/data'

export const WebsocketWrapper = async () => {
    // @Data
    const { user } = await getCurrentUser()

    // @Render
    return <Websocket userId={user?.id ?? ''} />
}

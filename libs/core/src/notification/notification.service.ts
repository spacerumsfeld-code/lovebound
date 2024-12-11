import { cacheClient } from '@clients/cache.client'
import { postToConnection } from '@clients/wss.client'

class NotificationService {
    private client

    constructor(client: typeof cacheClient) {
        this.client = client
    }

    public createConnection = async ({
        userId,
        connectionId,
    }: {
        userId: string
        connectionId: string
    }) => {
        await this.client.set(`ws:connection:${userId}`, connectionId)

        return { success: true }
    }

    public getConnection = async ({ userId }: { userId: string }) => {
        const connectionId = await this.client.get(`ws:connection:${userId}`)

        return {
            connectionId,
        }
    }

    public postToConnection = async ({
        userId,
        data,
    }: {
        userId: string
        data: Record<string, object | string | number | boolean>
    }) => {
        const { connectionId } = await this.getConnection({
            userId,
        })

        await postToConnection({
            id: connectionId as string,
            data,
        })

        return { success: true, id: connectionId! }
    }
}

const notificationService = new NotificationService(cacheClient)
export const Notification = notificationService

import { cacheClient } from '@clients/cache.client.ts'
import { postToConnection } from '@clients/wss.client.ts'

class ConnectionService {
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
        const connectionId = await this.client.get<string>(
            `ws:connection:${userId}`,
        )

        return {
            connectionId,
        }
    }

    public postToConnection = async ({
        userId,
        data,
    }: {
        userId: string
        data: Record<string, any>
    }) => {
        const { connectionId } = await this.getConnection({
            userId,
        })
        await postToConnection({
            id: connectionId!,
            data,
        })

        return { success: true }
    }
}

export const connectionService = new ConnectionService(cacheClient)

import { db } from '@clients/db.client.ts'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { eq } from 'drizzle-orm/expressions'
import { connections } from '@core'
import { postToConnection } from '@clients/wss.client.ts'

// @TODO: switch to redis for connection management. for now we want development velocity

class ConnectionService {
    private store

    constructor(store: NeonHttpDatabase) {
        this.store = store
    }

    public createConnection = async ({
        userId,
        connectionId,
    }: {
        userId: string
        connectionId: string
    }) => {
        const newConnection = await this.store
            .insert(connections)
            .values({ userId, connectionId })
            .returning({ id: connections.id })

        return { success: true, id: newConnection[0].id }
    }

    public getConnection = async ({ userId }: { userId: string }) => {
        const connection = await this.store
            .select({ connectionId: connections.connectionId })
            .from(connections)
            .where(eq(connections.userId, userId))

        return connection[0].connectionId
    }

    public deleteConnection = async ({
        connectionId,
    }: {
        connectionId: string
    }) => {
        await this.store
            .delete(connections)
            .where(eq(connections.connectionId, connectionId))

        return { success: true }
    }

    public postToConnection = async ({
        userId,
        data,
    }: {
        userId: string
        data: Record<string, any>
    }) => {
        const connectionId = await this.getConnection({
            userId,
        })
        await postToConnection({
            id: connectionId,
            data,
        })

        return { success: true }
    }
}

export const connectionService = new ConnectionService(db)

import { cacheClient } from '@clients/cache.client'
import { emailClient } from '@clients/email.client'
import { postToConnection } from '@clients/wss.client'
import { EmailType } from '@transactional'

class NotificationService {
    private cache
    private email

    constructor(cache: typeof cacheClient, email: typeof emailClient) {
        this.cache = cache
        this.email = email
    }

    public createConnection = async ({
        userId,
        connectionId,
    }: {
        userId: string
        connectionId: string
    }) => {
        await this.cache.set(`ws:connection:${userId}`, connectionId, {
            ex: 60 * 60 * 24,
        })

        return { success: true }
    }

    public getConnection = async ({ userId }: { userId: string }) => {
        const connectionId = await this.cache.get(`ws:connection:${userId}`)

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

    public sendEmail = async ({
        to,
        emailType,
    }: {
        to: string
        emailType: EmailType
    }) => {
        try {
            await this.email.sendEmail({ to, emailType })
            return { success: true }
        } catch (error) {
            throw new Error(error)
        }
    }
}

const notificationService = new NotificationService(cacheClient, emailClient)
export const Notification = notificationService

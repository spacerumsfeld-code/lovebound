import { db } from '@clients/db.client'
import { stripeClient } from '@clients/stripe.client'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { ProductTypeEnum, users } from '@core'
import { eq } from 'drizzle-orm/expressions'
import { sql } from 'drizzle-orm'

class PaymentService {
    private store
    private paymentClient

    constructor(store: NeonHttpDatabase, paymentClient: typeof stripeClient) {
        this.store = store
        this.paymentClient = paymentClient
    }

    public createCheckoutSession = async ({
        userId,
        // customerEmail,
        productType,
    }: {
        userId: string
        // customerEmail: string
        productType: ProductTypeEnum
    }) => {
        const { url } = await this.paymentClient.createCheckoutSession({
            userId,
            productType,
        })

        return url
    }

    public async getCreditCount({ userId }: { userId: string }) {
        const user = await this.store
            .select({ credits: users.credits })
            .from(users)
            .where(eq(users.clerkId, userId))

        return user[0].credits
    }

    public async topUpCredits({
        userId,
        productType,
    }: {
        userId: string
        productType: ProductTypeEnum
    }) {
        let creditCount: number
        switch (productType) {
            case ProductTypeEnum.Credits10Pack:
                creditCount = 10
                break
            case ProductTypeEnum.Credits20Pack:
                creditCount = 20
                break
            case ProductTypeEnum.Credits50Pack:
                creditCount = 50
                break
            case ProductTypeEnum.MiniSubscription:
                creditCount = 10
                break
            case ProductTypeEnum.PremiumSubscription:
                creditCount = 30
                break
            default:
                throw new Error('Invalid product type')
        }

        const result = await this.store
            .update(users)
            .set({
                credits: sql`${users.credits} + ${creditCount}`,
            })
            .where(eq(users.clerkId, userId))
            .returning({ credits: users.credits })

        return { success: true, newCreditCount: result[0].credits }
    }

    public async deductCredits({
        userId,
        storyLength,
    }: {
        userId: string
        storyLength: number
    }) {
        let creditCount: number
        switch (storyLength) {
            case 23:
                creditCount = 1
                break
            case 24:
                creditCount = 2
                break
            default:
                creditCount = 2
        }

        const result = await this.store
            .update(users)
            .set({
                credits: sql`${users.credits} - ${creditCount}`,
            })
            .where(eq(users.clerkId, userId))
            .returning({ credits: users.credits })

        return { success: true, newCreditCount: result[0].credits }
    }
}

const paymentService = new PaymentService(db, stripeClient)
export const Payment = paymentService

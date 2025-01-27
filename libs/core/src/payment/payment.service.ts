import { db } from '@clients/db.client'
import { stripeClient } from '@clients/stripe.client'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { CreditCountEnum, ProductTypeEnum, users } from '@core'
import { eq } from 'drizzle-orm/expressions'
import { sql } from 'drizzle-orm'
import { userInventory } from '@client-types/user/user.sql'

class PaymentService {
    private store
    private paymentClient

    constructor(store: NeonHttpDatabase, paymentClient: typeof stripeClient) {
        this.store = store
        this.paymentClient = paymentClient
    }

    public createCheckoutSession = async ({
        userId,
        customerEmail,
        productType,
    }: {
        userId: string
        customerEmail: string
        productType: ProductTypeEnum
    }) => {
        const { url } = await this.paymentClient.createCheckoutSession({
            customerEmail,
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

        /**
         * @gotcha
         * We coalesce to '3' because the only occasion where we've made it this far
         * and there is no user is on initial sign up (the clerk webhook moves slow).
         */
        return user?.[0]?.credits ?? 3
    }

    public async topUpCredits({
        userId,
        productType,
    }: {
        userId: string
        productType: ProductTypeEnum
    }) {
        const creditCount = CreditCountEnum[productType]

        await this.store
            .update(users)
            .set({
                credits: sql`${users.credits} + ${creditCount}`,
            })
            .where(eq(users.clerkId, userId))
            .returning({ credits: users.credits })

        return { success: true }
    }

    public async deductCredits({
        userId,
        creditCost,
    }: {
        userId: string
        creditCost: number
    }) {
        const result = await this.store
            .update(users)
            .set({
                credits: sql`${users.credits} - ${creditCost}`,
            })
            .where(eq(users.clerkId, userId))
            .returning({ credits: users.credits })

        return { success: true, newCreditCount: result[0].credits }
    }

    public async purchaseItem({
        userId,
        itemId,
    }: {
        userId: string
        itemId: number
    }) {
        await this.store.insert(userInventory).values({
            userId,
            itemId,
            purchasedAt: new Date(),
        })

        return { success: true }
    }
}

const paymentService = new PaymentService(db, stripeClient)
export const Payment = paymentService

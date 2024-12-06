import { db } from '@clients/db.client.ts'
import { stripeClient } from '@clients/stripe.client.ts'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { ProductTypeEnum } from '@core'

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

    // add credits to user balance (use store)
}

const paymentService = new PaymentService(db, stripeClient)
export const Payment = paymentService

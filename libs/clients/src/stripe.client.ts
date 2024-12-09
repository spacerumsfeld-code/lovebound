import { Stripe } from 'stripe'
import { Resource } from 'sst'
import { ProductIdEnum, ProductTypeEnum, subscriptionSet } from '@core'

const stripe = new Stripe(Resource.StripeSecretKey.value, {
    apiVersion: '2024-11-20.acacia',
    appInfo: {
        name: 'Lovebound',
    },
})

const verifyWebhook = ({
    body,
    signature,
    secret,
}: {
    body: string
    signature: string
    secret: string
}) => {
    const event = stripe.webhooks.constructEvent(body, signature, secret)

    return event
}

export const createCheckoutSession = async ({
    userId,
    // customerEmail = 'nickfin2014@gmail.com',
    productType,
}: {
    userId: string
    // customerEmail: string
    productType: ProductTypeEnum
}) => {
    const priceId = ProductIdEnum[productType]
    const isSubscription = subscriptionSet.has(productType)
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: isSubscription ? 'subscription' : 'payment',
        success_url: isSubscription
            ? 'http://localhost:3000/dashboard?action=modal.subscription.success'
            : 'http://localhost:3000/dashboard?action=modal.topup.success',
        cancel_url: 'http://localhost:3000/dashboard',
        customer_email: 'nickfin2014@gmail.com',
        metadata: {
            userId,
            productType,
        },
    })

    return { url: session.url }
}

const stripeClient = {
    createCheckoutSession,
    verifyWebhook,
}

export { stripeClient }

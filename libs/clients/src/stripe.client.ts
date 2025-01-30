import { Stripe } from 'stripe'
import { Resource } from 'sst'
import { ProductIdEnum, ProductTypeEnum, subscriptionSet } from '@core'

const stripe = new Stripe(Resource.StripeSecretKey.value, {
    apiVersion: '2024-11-20.acacia',
    appInfo: {
        name: 'Lovebound',
    },
})

const getSubscriptionStatus = async ({
    subscriptionId,
}: {
    subscriptionId: string
}) => {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    return subscription.status
}

const checkIfUserExistsInStripe = async ({ email }: { email: string }) => {
    const customers = await stripe.customers.list({
        email,
    })
    return customers.data.length > 0
}

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
    customerEmail,
    productType,
}: {
    userId: string
    customerEmail: string
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
            ? `${Resource.WebUrl.value}/dashboard?action=modal.subscription.success`
            : `${Resource.WebUrl.value}/dashboard?action=modal.topup.success`,
        cancel_url: `${Resource.WebUrl.value}/dashboard`,
        customer_email: customerEmail,
        metadata: {
            userId,
            productType,
            customerEmail,
        },
        subscription_data: {
            metadata: {
                userId,
                productType,
                customerEmail,
            },
        },
    })

    return { url: session.url }
}

const stripeClient = {
    checkIfUserExistsInStripe,
    createCheckoutSession,
    verifyWebhook,
    getSubscriptionStatus,
}

export { stripeClient }

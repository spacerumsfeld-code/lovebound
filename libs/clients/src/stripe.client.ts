import { Stripe } from 'stripe'
import { Resource } from 'sst'
import { ProductIdEnum, ProductTypeEnum, subscriptionSet } from '@core'

const stripe = new Stripe(Resource.StripeSecretKey.value, {
    apiVersion: '2025-01-27.acacia',
    appInfo: {
        name: 'Lovebound',
    },
})

const getSubscription = async ({
    subscriptionId,
}: {
    subscriptionId: string
}) => {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    return subscription
}

const getCurrentSubscriptionType = async ({ userId }: { userId: string }) => {
    const subscriptionSearch = await stripe.subscriptions.search({
        limit: 1,
        query: `metadata["userId"]:"${userId}" status:"active"`,
    })

    const priceId =
        subscriptionSearch.data?.[0]?.items?.data?.[0]?.plan.id ?? null
    return priceId
        ? (ProductTypeEnum[priceId as keyof typeof ProductTypeEnum] ?? null)
        : null
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
                customerEmail,
            },
        },
    })

    return { url: session.url }
}

const stripeClient = {
    getCurrentSubscriptionType,
    checkIfUserExistsInStripe,
    createCheckoutSession,
    verifyWebhook,
    getSubscription,
}

export { stripeClient }

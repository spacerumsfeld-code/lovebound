import { Stripe } from 'stripe'
import { Resource } from 'sst'
import { ProductTypeEnum, subscriptionSet } from '@core'
import { generateId } from '@utils'
import { PriceIdToProductTypeEnum } from '@client-types/payment/payment.model'

export const ProductIdEnum: Record<ProductTypeEnum, string> = {
    [ProductTypeEnum.Credits10Pack]:
        Resource.Environment.value === 'production'
            ? 'price_1Qnl8mLZGjrJKEOlHtbdHj4e'
            : 'price_1QStXILZGjrJKEOlJyokkZVC',
    [ProductTypeEnum.Credits20Pack]:
        Resource.Environment.value === 'production'
            ? 'price_1Qnl8qLZGjrJKEOlqJv3ON88'
            : 'price_1QSthLLZGjrJKEOlrABFyIR7',
    [ProductTypeEnum.Credits50Pack]:
        Resource.Environment.value === 'production'
            ? 'price_1Qnl8sLZGjrJKEOl4FE2CCYX'
            : 'price_1QStjoLZGjrJKEOlooXjFf8m',
    [ProductTypeEnum.CasualSubscription]:
        Resource.Environment.value === 'production'
            ? 'price_1Qnl8YLZGjrJKEOlz03SpdfU'
            : 'price_1QStaQLZGjrJKEOlBhU4C3BM',
    [ProductTypeEnum.PremiumSubscription]:
        Resource.Environment.value === 'production'
            ? 'price_1Qnl9yLZGjrJKEOlwWg8pKdG'
            : 'price_1QlycXLZGjrJKEOlrQtfZv8H',
}

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
        ? (PriceIdToProductTypeEnum[
              priceId as keyof typeof PriceIdToProductTypeEnum
          ] as unknown as ProductTypeEnum)
        : null
}

const getStripeIdByEmail = async ({ email }: { email: string }) => {
    const customers = await stripe.customers.list({
        email,
        limit: 1,
    })
    return customers.data?.length ? customers.data[0].id : null
}

const getPromoCodeById = async ({ id }: { id: string }) => {
    const promoCode = await stripe.promotionCodes.retrieve(id)
    return promoCode
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

const createPromoCode = async ({
    referrerId,
    referrerEmail,
}: {
    referrerId: string
    referrerEmail: string
}) => {
    await stripe.promotionCodes.create({
        code: `REF-${generateId(6)}`,
        coupon: Resource.StripeReferralCouponId.value,
        max_redemptions: 1,
        metadata: {
            referrerId,
            referrerEmail,
        },
    })

    return {
        success: true,
    }
}

const createCheckoutSession = async ({
    userId,
    customerEmail,
    productType,
}: {
    userId: string
    customerEmail: string
    productType: ProductTypeEnum
}) => {
    let userStripeId = await getStripeIdByEmail({ email: customerEmail })
    const priceId = ProductIdEnum[productType]
    const isSubscription = subscriptionSet.has(productType)

    if (!userStripeId) {
        const customer = await stripe.customers.create({
            email: customerEmail,
            metadata: {
                userId,
            },
        })
        userStripeId = customer.id
    }

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
        customer_email: userStripeId ? undefined : customerEmail,
        customer: userStripeId,
        allow_promotion_codes: true,
        metadata: {
            userId,
            productType,
            customerEmail,
        },
        subscription_data: isSubscription
            ? {
                  metadata: {
                      userId,
                      customerEmail,
                  },
              }
            : undefined,
    })

    return { url: session.url }
}

const stripeClient = {
    getPromoCodeById,
    createPromoCode,
    getCurrentSubscriptionType,
    getStripeIdByEmail,
    createCheckoutSession,
    verifyWebhook,
    getSubscription,
}

export { stripeClient }

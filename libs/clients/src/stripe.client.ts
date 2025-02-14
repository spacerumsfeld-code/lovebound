import { Stripe } from 'stripe'
import { Resource } from 'sst'
import { ProductIdEnum, ProductTypeEnum, subscriptionSet } from '@core'
import { generateId } from '@utils'
import { PriceIdToProductTypeEnum } from '@client-types/payment/payment.model'

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
        ? PriceIdToProductTypeEnum[
              priceId as keyof typeof PriceIdToProductTypeEnum
          ]
        : null
}

const getStripeIdByEmail = async ({ email }: { email: string }) => {
    const customers = await stripe.customers.list({
        email,
    })
    return customers.data?.[0]?.id ?? null
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
    const priceId = ProductIdEnum[productType]
    const isSubscription = subscriptionSet.has(productType)
    const userStripeId = await getStripeIdByEmail({ email: customerEmail })

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
        customer: userStripeId ? userStripeId : undefined,
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

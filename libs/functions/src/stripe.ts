import type { Stripe } from 'stripe'
import { stripeClient } from '@clients/stripe.client'
import { Resource } from 'sst'
import { Payment, ZCheckoutCompleteMetadata } from '@core'
import { handleAsync } from '@utils'

// @TODO: email and in-app notifications for checkout complete.

export const handler = async (req: any) => {
    let event: Stripe.Event
    try {
        event = stripeClient.verifyWebhook({
            body: req.body,
            signature: req.headers['stripe-signature'],
            secret: Resource.StripeWebhookSecret.value,
        })
    } catch (error) {
        return {
            status: 500,
            body: JSON.stringify({ error: error.message }),
        }
    }

    const permittedEvents = new Set<string>(['checkout.session.completed'])

    if (permittedEvents.has(event.type)) {
        let data
        try {
            switch (event.type) {
                case 'checkout.session.completed':
                    data = event.data.object as Stripe.Checkout.Session
                    console.log(
                        `💰 CheckoutSession status: ${data.payment_status}`,
                    )

                    const { data: parsedData, error } =
                        ZCheckoutCompleteMetadata.safeParse(data.metadata)
                    if (error) {
                        console.error(
                            `❌ stripe.checkoutComplete error:`,
                            error,
                        )
                        return {
                            status: 500,
                            body: JSON.stringify({ error: error.message }),
                        }
                    }

                    const [, topupError] = await handleAsync(
                        Payment.topUpCredits({
                            userId: parsedData.userId,
                            productType: parsedData.productType,
                        }),
                    )
                    if (topupError) {
                        console.error(
                            `❌ stripe.checkoutComplete error:`,
                            topupError,
                        )
                        return {
                            status: 500,
                            body: JSON.stringify({ error: topupError.message }),
                        }
                    }
                    break
                default:
                    console.log('Unhandled event type:', event.type)
                    break
            }
        } catch (error) {
            console.error('Error processing Stripe event:', error)
            return {
                status: 500,
                body: JSON.stringify({ error: error.message }),
            }
        }
    }

    return {
        status: 200,
        body: JSON.stringify({ received: true }),
    }
}

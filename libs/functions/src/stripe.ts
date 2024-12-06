import type { Stripe } from 'stripe'
import { stripeClient } from '@clients/stripe.client.ts'
import { Resource } from 'sst'

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

    const permittedEvents: string[] = [
        'checkout.session.completed',
        'payment_intent.succeeded',
        'payment_intent.payment_failed',
    ]

    if (permittedEvents.includes(event.type)) {
        let data

        try {
            switch (event.type) {
                case 'checkout.session.completed':
                    data = event.data.object as Stripe.Checkout.Session

                    // based on
                    console.log(
                        `💰 CheckoutSession status: ${data.payment_status}`,
                    )
                    break
                case 'payment_intent.payment_failed':
                    data = event.data.object as Stripe.PaymentIntent
                    console.log(
                        `❌ Payment failed: ${data.last_payment_error?.message}`,
                    )
                    break
                case 'payment_intent.succeeded':
                    data = event.data.object as Stripe.PaymentIntent
                    console.log(`💰 PaymentIntent status: ${data.status}`)
                    break
                default:
                    console.log('Unhandled event type:', event.type)
                    // throw new Error(`Unhandled event: ${event.type}`)
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

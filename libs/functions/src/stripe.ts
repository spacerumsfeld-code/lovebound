import type { Stripe } from 'stripe'
import { stripeClient } from '@clients/stripe.client'
import { Resource } from 'sst'
import {
    Notification,
    Payment,
    subscriptionSet,
    User,
    ZStripeMetadata,
} from '@core'
import { handleAsync } from '@utils'
import { EmailType } from '@transactional'
import {
    ProductTypeEnum,
    ZStripeSubscriptionMetadata,
} from '@client-types/payment/payment.model'

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

    const permittedEvents = new Set<string>([
        'checkout.session.completed',
        'invoice.paid',
        'customer.subscription.created',
        'customer.subscription.deleted',
    ])
    if (permittedEvents.has(event.type)) {
        let data
        switch (event.type) {
            case 'checkout.session.completed':
                data = event.data.object as Stripe.Checkout.Session

                const { data: parsedData, error } = ZStripeMetadata.safeParse(
                    data.metadata,
                )
                if (error) {
                    console.error(
                        `❌ stripe.checkoutComplete validation error:`,
                        error,
                    )
                    return {
                        status: 500,
                        body: JSON.stringify({ error: error.message }),
                    }
                }
                console.info(
                    `💰 Handling checkout.session.completed event with metadata:`,
                    parsedData,
                )

                /**
                 * @info
                 * This event is invoked for subscriptions as well, but we will use
                 * invoice.paid for all payments received for subscriptions to maintain
                 * separation of concerns.
                 */
                if (subscriptionSet.has(parsedData.productType)) {
                    break
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

                const [, updateUserError] = await handleAsync(
                    User.updateUser({
                        userId: parsedData.userId,
                        gettingStartedTopUpCredits: true,
                    }),
                )
                if (updateUserError) {
                    console.error(
                        `❌ stripe.checkoutComplete error:`,
                        updateUserError,
                    )
                    return {
                        status: 500,
                        body: JSON.stringify({
                            error: updateUserError.message,
                        }),
                    }
                }

                break
            case 'invoice.paid':
                data = event.data.object as Stripe.Invoice

                const {
                    data: parsedSubscriptionMetadata,
                    error: parsedSubscriptionMetadataError,
                } = ZStripeSubscriptionMetadata.safeParse(
                    data.subscription_details?.metadata,
                )
                if (parsedSubscriptionMetadataError) {
                    console.error(
                        `❌ stripe.invoicePaid validation error:`,
                        parsedSubscriptionMetadataError,
                    )
                    return {
                        status: 500,
                        body: JSON.stringify({
                            error: parsedSubscriptionMetadataError.message,
                        }),
                    }
                }

                console.info(
                    `💰 Handling invoice.paid event with metadata:`,
                    parsedSubscriptionMetadata,
                )

                const [subscription, subscriptionError] = await handleAsync(
                    stripeClient.getSubscription({
                        subscriptionId: data.subscription as string,
                    }),
                )
                if (subscriptionError) {
                    console.error(
                        `❌ stripe.invoicePaid error:`,
                        subscriptionError,
                    )
                }

                if (data.paid && subscription!.status === 'active') {
                    const [, topupError] = await handleAsync(
                        Payment.topUpCredits({
                            userId: parsedSubscriptionMetadata.userId,
                            productType:
                                ProductTypeEnum[
                                    subscription!.items.data[0].plan
                                        .id as keyof typeof ProductTypeEnum
                                ],
                        }),
                    )
                    if (topupError) {
                        console.error(
                            `❌ stripe.invoicePaid error:`,
                            topupError,
                        )
                        return {
                            status: 500,
                            body: JSON.stringify({
                                error: topupError.message,
                            }),
                        }
                    }
                }
                break
            case 'customer.subscription.created':
                data = event.data.object as Stripe.Subscription

                const {
                    data: subscriptionCreatedMetadata,
                    error: subscriptionCreatedMetadataError,
                } = ZStripeSubscriptionMetadata.safeParse(data.metadata)
                if (subscriptionCreatedMetadataError) {
                    console.error(
                        `❌ stripe.subscriptionCreated validation error:`,
                        subscriptionCreatedMetadataError,
                    )
                    return {
                        status: 500,
                        body: JSON.stringify({
                            error: subscriptionCreatedMetadataError.message,
                        }),
                    }
                }

                console.info(
                    `💰 Handling subscription.created event with metadata:`,
                    subscriptionCreatedMetadata,
                )

                const [, sendEmailError] = await handleAsync(
                    Notification.sendEmail({
                        to: subscriptionCreatedMetadata.customerEmail,
                        emailType: EmailType.SubscriptionCreated,
                    }),
                )
                if (sendEmailError) {
                    console.error(
                        `❌ stripe.subscriptionCreated error:`,
                        sendEmailError,
                    )
                    return {
                        status: 500,
                        body: JSON.stringify({
                            error: sendEmailError.message,
                        }),
                    }
                }
                break
            case 'customer.subscription.deleted':
                data = event.data.object as Stripe.Subscription

                const {
                    data: subscriptionDeletedMetadata,
                    error: subscriptionDeletedMetadataError,
                } = ZStripeSubscriptionMetadata.safeParse(data.metadata)
                if (subscriptionDeletedMetadataError) {
                    console.error(
                        `❌ stripe.invoicePaid validation error:`,
                        subscriptionDeletedMetadataError,
                    )
                    return {
                        status: 500,
                        body: JSON.stringify({
                            error: subscriptionDeletedMetadataError.message,
                        }),
                    }
                }

                console.info(
                    `💰 Handling subscription.deleted event with metadata:`,
                    subscriptionDeletedMetadata,
                )

                const [, sendCancelledEmailError] = await handleAsync(
                    Notification.sendEmail({
                        to: subscriptionDeletedMetadata.customerEmail,
                        emailType: EmailType.SubscriptionCancelled,
                    }),
                )
                if (sendCancelledEmailError) {
                    console.error(
                        `❌ stripe.subscriptionDeleted error:`,
                        sendCancelledEmailError,
                    )
                    return {
                        status: 500,
                        body: JSON.stringify({
                            error: sendCancelledEmailError.message,
                        }),
                    }
                }
                break
        }
    }

    return {
        status: 200,
        body: JSON.stringify({
            success: true,
            message: `💰 ${event.type} processed successfully`,
        }),
    }
}

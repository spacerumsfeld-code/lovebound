import type { Stripe } from 'stripe'
import { Resource } from 'sst'
import {
    Payment,
    Notification,
    subscriptionSet,
    User,
    ZStripeMetadata,
} from '@core'
import { handleAsync, resolvePromises } from '@utils'
import { EmailType } from '@transactional'
import {
    ProductTypeEnum,
    ZStripeSubscriptionMetadata,
} from '@client-types/payment/payment.model'

export const handler = async (req: any) => {
    let event: Stripe.Event
    try {
        event = Payment.verifyWebhook({
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
                 * handle subscriptions solely in the invoice.paid handler.
                 */
                if (subscriptionSet.has(parsedData.productType)) {
                    break
                }

                /**
                 * @info
                 * handle referral code, if present
                 */
                const promoCodeId = data?.discounts?.[0]?.promotion_code ?? null
                if (promoCodeId) {
                    const [promoCode, promoCodeError] = await handleAsync(
                        Payment.getPromoCodeById({ id: promoCodeId as string }),
                    )
                    if (promoCodeError) {
                        console.error(
                            `❌ stripe.checkoutComplete error:`,
                            promoCodeError,
                        )
                        return {
                            status: 500,
                            body: JSON.stringify({
                                error: promoCodeError.message,
                            }),
                        }
                    }

                    if (parsedData.userId === promoCode!.metadata!.referrerId) {
                        const [, sendNaughtyEmailError] = await handleAsync(
                            Notification.sendEmail({
                                to: parsedData.customerEmail,
                                emailType: EmailType.SelfReferral,
                            }),
                        )
                        if (sendNaughtyEmailError) {
                            console.error(
                                `❌ stripe.checkoutComplete error:`,
                                sendNaughtyEmailError,
                            )
                        }
                        break
                    }

                    await resolvePromises([
                        {
                            promise: Payment.topUpCredits({
                                userId: promoCode!.metadata!.referrerId,
                                productType: ProductTypeEnum.Credits10Pack,
                            }),
                        },
                        {
                            promise: Notification.sendEmail({
                                to: parsedData.customerEmail,
                                emailType: EmailType.ReferralUseReferred,
                            }),
                        },
                        {
                            promise: Notification.sendEmail({
                                to: promoCode!.metadata!.referrerEmail,
                                emailType: EmailType.ReferralUseReferrer,
                            }),
                        },
                        // update referrer "gettingStartedReferSomeone" field.
                    ])
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
                    Payment.getSubscription({
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

import { render } from 'jsx-email'
import { EmailType } from './email.model'
import { BaseEmail } from './emails'
import * as React from 'react'

export const emails = {
    [EmailType.Welcome]: {
        subject: 'Welcome to Lovebound',
        text: 'Welcome to Lovebound',
        html: async () =>
            await render(
                <BaseEmail
                    config={{
                        title: 'Welcome',
                        message:
                            'Welcome to Lovebound! We are excited to have you. Start creating stories at your leisure; you have 3 credits to begin your journey!',
                    }}
                />,
            ),
    },
    [EmailType.StoryCreated]: {
        subject: 'Story Created',
        text: 'Story Created',
        html: async () =>
            await render(
                <BaseEmail
                    config={{
                        title: 'Story Created',
                        message:
                            'Your story has been created! Our AI authors are hard at work writing its pages. The process usually takes about a minute.',
                    }}
                />,
            ),
    },
    [EmailType.StoryCompleted]: {
        subject: 'Story Completed',
        text: 'Story Completed',
        html: async () =>
            await render(
                <BaseEmail
                    config={{
                        title: 'Story Completed',
                        message: 'Your story has been completed!',
                    }}
                />,
            ),
    },
    [EmailType.PurchaseSuccessful]: {
        subject: 'Purchase Successful',
        text: 'Purchase Successful',
        html: async () =>
            await render(
                <BaseEmail
                    config={{
                        title: 'Purchase Successful',
                        message:
                            'Your purchase is successful! Your items are ready to use to craft your next story.',
                    }}
                />,
            ),
    },
    [EmailType.SubscriptionCreated]: {
        subject: 'Subscription Created',
        text: 'Subscription Created',
        html: async () =>
            await render(
                <BaseEmail
                    config={{
                        title: 'Subscription Created',
                        message:
                            'Your subscription is active! Your credits have been topped up and you now have access to additional features.',
                    }}
                />,
            ),
    },
    [EmailType.SubscriptionCancelled]: {
        subject: 'Subscription Cancelled',
        text: 'Subscription Cancelled',
        html: async () =>
            await render(
                <BaseEmail
                    config={{
                        title: 'Subscription Cancelled',
                        message:
                            'We hate to see you go and hope to see you again soon!',
                    }}
                />,
            ),
    },
    [EmailType.SelfReferral]: {
        subject: 'Oops',
        text: 'You tried to self refer',
        html: async () =>
            await render(
                <BaseEmail
                    config={{
                        title: 'Oops',
                        message:
                            'It looks like you tried to use your own referral code! As you can imagine, that is not allowed, so your credits have not been topped up.',
                    }}
                />,
            ),
    },
    [EmailType.ReferralUseReferred]: {
        subject: 'You used a referral code!',
        text: 'Your free credits are ready for use.',
        html: async () =>
            await render(
                <BaseEmail
                    config={{
                        title: 'You used a referral code!',
                        message:
                            'You used a referral code, and as a result you have an additional 10 credits in your account. Your friend also received 10 credits. Nicely done!',
                    }}
                />,
            ),
    },
    [EmailType.ReferralUseReferrer]: {
        subject: 'Someone used your referral code!',
        text: 'Your free credits are ready for use.',
        html: async () =>
            await render(
                <BaseEmail
                    config={{
                        title: 'Someone used your referral code!',
                        message:
                            'Someone used your referral code, and as a result you have an additional 10 credits in your account. Your friend also received 10 credits. Nicely done!',
                    }}
                />,
            ),
    },
}

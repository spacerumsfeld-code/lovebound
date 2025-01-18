import { render } from 'jsx-email'
import { EmailType } from './email.model'
import { BaseEmail } from './emails'

export const emails = {
    [EmailType.Welcome]: {
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
        subject: 'Welcome to Lovebound',
        text: 'Welcome to Lovebound',
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
                            'Your purchase has been successful! Your items are ready to use to craft your next story.',
                    }}
                />,
            ),
    },
}

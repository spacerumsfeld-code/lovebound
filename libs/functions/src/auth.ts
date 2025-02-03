import { Webhook } from 'svix'
import { handleAsync, resolvePromises } from '@utils'
import { Resource } from 'sst'
import { UserCreatedOrUpdatedData, User, ClerkUserEvent, Payment } from '@core'
import { Handler, APIGatewayEvent } from 'aws-lambda'
import { emailClient } from '@clients/email.client'
import { Notification } from '@core'
import { EmailType } from '@transactional'

export const handler: Handler = async (req: APIGatewayEvent) => {
    try {
        const wh = new Webhook(Resource.AuthHandlerSigningSecret.value)
        const svix_id = req.headers['svix-id']
        const svix_timestamp = req.headers['svix-timestamp']
        const svix_signature = req.headers['svix-signature']

        wh.verify(req.body!, {
            'svix-id': svix_id!,
            'svix-timestamp': svix_timestamp!,
            'svix-signature': svix_signature!,
        })
    } catch (error) {
        console.error(`
            👤❌ Webhook verification error:
            ${JSON.stringify(error)}
        `)
        return {
            status: 500,
            body: JSON.stringify({ error: error.message }),
        }
    }

    const allowedEvents = new Set<string>(['user.created'])
    const eventData = JSON.parse(req.body!) as ClerkUserEvent

    if (allowedEvents.has(eventData.type)) {
        switch (eventData.type) {
            case 'user.created':
                const createData = eventData.data as UserCreatedOrUpdatedData

                console.info(
                    '👤 Handling user.created event for clerkId:',
                    JSON.stringify(createData.id),
                )

                const email = createData.email_addresses.find(
                    (email) => email.id === createData.primary_email_address_id,
                )!.email_address

                const [, createUserError] = await handleAsync(
                    User.createUser({
                        email,
                        firstName: createData.first_name ?? '',
                        lastName: createData.last_name ?? '',
                        clerkId: createData.id,
                    }),
                )
                if (createUserError) {
                    console.error(`
                        👤❌ createUser error:
                        ${JSON.stringify(createUserError)}
                    `)
                    return {
                        status: 500,
                        body: JSON.stringify({
                            error: createUserError!.message,
                        }),
                    }
                }

                const { errorMessage } = await resolvePromises([
                    {
                        promise: emailClient.addToAudience({
                            email,
                        }),
                    },
                    {
                        promise: Notification.sendEmail({
                            to: email,
                            emailType: EmailType.Welcome,
                        }),
                    },
                    {
                        promise: Payment.createReferralPromoCode({
                            referrerId: createData.id,
                            referrerEmail: email,
                        }),
                    },
                ])
                if (errorMessage) {
                    console.error(`👤❌ createUser error: ${errorMessage}`)
                    return {
                        status: 500,
                        body: JSON.stringify({
                            error: errorMessage,
                        }),
                    }
                }

                break
        }

        return {
            status: 200,
            body: JSON.stringify({
                message: `User event handled of type ${eventData.type}`,
            }),
        }
    }
}

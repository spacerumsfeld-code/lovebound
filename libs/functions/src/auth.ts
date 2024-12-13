import { Webhook } from 'svix'
import { handleAsync } from '@utils'
import { Resource } from 'sst'
import { UserCreatedOrUpdatedData, User, ClerkUserEvent } from '@core'
import { Handler, APIGatewayEvent } from 'aws-lambda'
import { UserDeletedData } from '@client-types/user/user.model'

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
        return {
            status: 500,
            body: JSON.stringify({ error: error.message }),
        }
    }

    const allowedEvents = new Set<string>([
        'user.created',
        'user.updated',
        'user.deleted',
    ])
    const eventData = JSON.parse(req.body!) as ClerkUserEvent

    if (allowedEvents.has(eventData.type)) {
        switch (eventData.type) {
            case 'user.created':
                const createData = eventData.data as UserCreatedOrUpdatedData
                console.info(
                    '👤 Handling user.created event for clerkId:',
                    JSON.stringify(createData.id),
                )

                console.info(JSON.stringify(createData))
                const [, createUserError] = await handleAsync(
                    User.createUser({
                        email: createData.email_addresses.find(
                            (email) =>
                                email.id ===
                                createData.primary_email_address_id,
                        )!.email_address,
                        firstName: createData.first_name,
                        lastName: createData.last_name ?? '',
                        clerkId: createData.id,
                        profileImageUrl: createData.profile_image_url,
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
                            error: createUserError.message,
                        }),
                    }
                }

                break
            case 'user.updated':
                const updateData = eventData.data as UserCreatedOrUpdatedData
                console.info(
                    '👤 Handling user.updated event for clerkId:',
                    JSON.stringify(updateData.id),
                )

                const [, updateUserError] = await handleAsync(
                    User.updateUser({
                        clerkId: updateData.id,
                        email: updateData.email_addresses.find(
                            (email) =>
                                email.id ===
                                updateData!.primary_email_address_id,
                        )!.email_address,
                        profileImageUrl: updateData.profile_image_url,
                    }),
                )
                if (updateUserError) {
                    console.error(`
                        👤❌ updateUser error:
                        ${JSON.stringify(updateUserError)}
                    `)
                    return {
                        status: 500,
                        body: JSON.stringify({
                            error: updateUserError.message,
                        }),
                    }
                }

                break
            case 'user.deleted':
                const deleteData = eventData.data as UserDeletedData
                console.info(
                    '👤 Handling user.deleted event for email:',
                    JSON.stringify(deleteData.id),
                )

                const [, markUserDeletedError] = await handleAsync(
                    User.markUserDeleted({
                        clerkId: deleteData.id,
                    }),
                )
                if (markUserDeletedError) {
                    return {
                        status: 5000,
                        message: JSON.stringify({
                            error: markUserDeletedError.message,
                        }),
                    }
                }
                break
        }
    }
}

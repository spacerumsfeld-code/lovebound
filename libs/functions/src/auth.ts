import { Webhook } from 'svix'
import { handleAsync } from '@utils'
import { Resource } from 'sst'
import { User } from '@core'

interface ClerkUserData {
    birthday: string
    created_at: number
    email_addresses: {
        email_address: string
        id: string
        linked_to: string[]
        object: 'email_address'
        verification: {
            status: 'verified'
            strategy: 'ticket'
        }
    }[]
    external_accounts: string[]
    external_id: string
    first_name: string
    gender: string
    id: string
    image_url: string
    last_name: string
    last_sign_in_at: number
    object: 'user'
    password_enabled: boolean
    phone_numbers: string[]
    primary_email_address_id: string
    primary_phone_number_id: string
    primary_web3_wallet_id: string
    private_metadata: Record<string, string>
    profile_image_url: string
    public_metadata: Record<string, string>
    two_factor_enabled: boolean
    unsafe_metadata: Record<string, string>
    updated_at: number
    username: string
}

export const handler = async (event: any) => {
    const wh = new Webhook(Resource.AuthHandlerSigningSecret.value)
    const svix_id = event.headers['svix-id']
    const svix_timestamp = event.headers['svix-timestamp']
    const svix_signature = event.headers['svix-signature']

    wh.verify(event.body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
    })
    const eventData = JSON.parse(event.body)
    const type = eventData.type
    const data: ClerkUserData = eventData.data

    switch (type) {
        case 'user.created':
            const [_, error] = await handleAsync(
                User.createUser({
                    email: data.email_addresses.find(
                        (email) => email.id === data.primary_email_address_id,
                    )!.email_address,
                    birthday: data.birthday,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    gender: data.gender,
                    clerkId: data.id,
                    profileImageUrl: data.profile_image_url,
                }),
            )
            if (error) {
                console.error('oops', error)
                return
            }

            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'User created successfully',
                }),
            }
        case 'user.updated':
            console.log('Login webhook received')
            break
        case 'user.deleted':
            console.log('Logout webhook received')
            break
        default:
            console.log('Unknown webhook received')
            break
    }
}

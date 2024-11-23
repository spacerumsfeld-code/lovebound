import { Webhook } from 'svix'
import { pipe } from '@utils'
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
            return pipe(
                data,
                (context) =>
                    User.createUser({
                        email: context.email_addresses.find(
                            (email) =>
                                email.id === context.primary_email_address_id,
                        )!.email_address,
                        birthday: context.birthday,
                        firstName: context.first_name,
                        lastName: context.last_name,
                        gender: context.gender,
                        clerkId: context.id,
                        profileImageUrl: context.profile_image_url,
                    }),
                (_) => ({ status: 200, message: 'User created' }),
            )
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

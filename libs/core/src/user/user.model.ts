export interface ClerkUserEvent<T = object> {
    data: T
    event_attributes: {
        http_request: {
            client_ip: string
            user_agent: string
        }
    }
    object: string
    timestamp: number
    type: string
}

export interface UserDeletedData {
    deleted: boolean
    id: string
    object: string
}

export interface UserEmailAddress {
    email_address: string
    id: string
    linked_to: unknown[]
    object: string
    reserved: boolean
    verification: {
        attempts: number | null
        expire_at: number | null
        status: string
        strategy: string
    }
}

export interface UserCreatedOrUpdatedData {
    birthday: string
    created_at: number
    email_addresses: UserEmailAddress[]
    external_accounts: unknown[]
    external_id: string | null
    first_name: string
    gender: string
    id: string
    image_url: string
    last_name: string | null
    last_sign_in_at: number | null
    object: string
    password_enabled: boolean
    phone_numbers: unknown[]
    primary_email_address_id: string
    primary_phone_number_id: string | null
    primary_web3_wallet_id: string | null
    private_metadata: Record<string, unknown>
    profile_image_url: string
    public_metadata: Record<string, unknown>
    two_factor_enabled: boolean
    unsafe_metadata: Record<string, unknown>
    updated_at: number
    username: string | null
    web3_wallets: unknown[]
}

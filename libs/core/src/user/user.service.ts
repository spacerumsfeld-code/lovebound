import { db } from '@clients/db.client.ts'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { users } from '@core'

class UserService {
    private store

    constructor(store: NeonHttpDatabase) {
        this.store = store
    }

    public async createUser({
        clerkId,
        email,
        gender,
        firstName,
        lastName,
        profileImageUrl,
        birthday,
    }: {
        clerkId: string
        email: string
        gender: string
        firstName: string
        lastName: string
        profileImageUrl: string
        birthday: string
    }) {
        const newUser = await this.store
            .insert(users)
            .values({
                clerkId,
                email,
                gender,
                firstName,
                lastName,
                profileImageUrl,
                birthday,
            })
            .returning({ id: users.id })

        return { success: true, id: newUser[0].id }
    }
}

export const userService = new UserService(db)

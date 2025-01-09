import { db } from '@clients/db.client'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { users } from './user.sql'
import { eq } from 'drizzle-orm'

class UserService {
    private store

    constructor(store: NeonHttpDatabase) {
        this.store = store
    }

    public async createUser({
        clerkId,
        email,
        firstName,
        lastName,
        profileImageUrl,
    }: {
        clerkId: string
        email: string
        firstName: string
        lastName: string
        profileImageUrl: string
    }) {
        const newUser = await this.store
            .insert(users)
            .values({
                clerkId,
                email,
                firstName,
                lastName,
                profileImageUrl,
            })
            .returning({ id: users.id })

        return { success: true, id: newUser[0].id }
    }

    public async getUserEmail({ userId }: { userId: string }) {
        const user = await this.store
            .select({ email: users.email })
            .from(users)
            .where(eq(users.clerkId, userId))

        return user?.[0]?.email
    }

    public async updateUser({
        clerkId,
        email,
        profileImageUrl,
    }: {
        clerkId: string
        email: string
        profileImageUrl: string
    }) {
        await this.store
            .update(users)
            .set({ email, profileImageUrl })
            .where(eq(users.clerkId, clerkId))
    }

    public async markUserDeleted({ clerkId }: { clerkId: string }) {
        await this.store
            .update(users)
            .set({
                deleted: true,
            })
            .where(eq(users.clerkId, clerkId))

        return { success: true }
    }
}

const userService = new UserService(db)
export const User = userService

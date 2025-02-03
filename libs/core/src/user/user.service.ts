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

    public async getUserReferralCode({ userId }: { userId: string }) {
        const user = await this.store
            .select({ referralCode: users.referralCode })
            .from(users)
            .where(eq(users.clerkId, userId))

        return user?.[0]?.referralCode
    }

    public async getUserGettingStartedFields({ userId }: { userId: string }) {
        const user = await this.store
            .select({
                gettingStartedCreateStory: users.gettingStartedCreateStory,
                gettingStartedExploreShop: users.gettingStartedExploreShop,
                gettingStartedTopUpCredits: users.gettingStartedTopUpCredits,
                gettingStartedPurchaseItem: users.gettingStartedPurchaseItem,
                gettingStartedReferralUsed: users.gettingStartedReferralUsed,
            })
            .from(users)
            .where(eq(users.clerkId, userId))

        console.info('we got our user!!!!!', user)

        return user?.[0]
    }

    public async updateUser({
        userId,
        email,
        profileImageUrl,
        gettingStartedCreateStory,
        gettingStartedExploreShop,
        gettingStartedTopUpCredits,
        gettingStartedPurchaseItem,
        gettingStartedReferralUsed,
        referralCode,
    }: {
        userId: string
        email?: string
        profileImageUrl?: string
        gettingStartedCreateStory?: boolean
        gettingStartedExploreShop?: boolean
        gettingStartedTopUpCredits?: boolean
        gettingStartedPurchaseItem?: boolean
        gettingStartedReferralUsed?: boolean
        referralCode?: string
    }) {
        const setParams = Object.fromEntries(
            Object.entries({
                email,
                profileImageUrl,
                gettingStartedCreateStory,
                gettingStartedExploreShop,
                gettingStartedTopUpCredits,
                gettingStartedPurchaseItem,
                gettingStartedReferralUsed,
                referralCode,
            }).filter(([, value]) => value !== undefined && value !== null),
        )

        await this.store
            .update(users)
            .set(setParams)
            .where(eq(users.clerkId, userId))
    }
}

const userService = new UserService(db)
export const User = userService

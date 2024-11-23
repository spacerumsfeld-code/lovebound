import { date, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    clerkId: text('clerk_id').unique().notNull(),
    email: text('email').unique().notNull(),
    birthday: text('birthday'),
    firstName: text('first_name'),
    lastName: text('last_name'),
    profileImageUrl: text('profile_image_url'),
    gender: text('gender'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

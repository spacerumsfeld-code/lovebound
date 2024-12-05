import {
    integer,
    pgTable,
    serial,
    text,
    timestamp,
    unique,
    uuid,
} from 'drizzle-orm/pg-core'
import { items } from '../item/item.sql.ts'

export const users = pgTable(
    'users',
    {
        id: uuid().defaultRandom().primaryKey().notNull(),
        clerkId: text('clerk_id').notNull(),
        email: text().notNull(),
        createdAt: timestamp('created_at', { mode: 'string' })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp('updated_at', { mode: 'string' })
            .defaultNow()
            .notNull(),
        birthday: text(),
        firstName: text('first_name'),
        lastName: text('last_name'),
        profileImageUrl: text('profile_image_url'),
        gender: text(),
        credits: integer('credits').default(0).notNull().default(3),
    },
    (table) => {
        return {
            usersClerkIdUnique: unique('users_clerk_id_unique').on(
                table.clerkId,
            ),
            usersEmailUnique: unique('users_email_unique').on(table.email),
        }
    },
)

export const userInventory = pgTable('user_inventory', {
    id: serial('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => users.clerkId),
    itemId: integer('item_id')
        .notNull()
        .references(() => items.id),
    purchasedAt: timestamp('purchased_at').defaultNow().notNull(),
})

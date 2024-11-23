import {
    integer,
    pgTable,
    serial,
    text,
    timestamp,
    uuid,
} from 'drizzle-orm/pg-core'
import { users } from '../user/user.model'

export const stories = pgTable('stories', {
    id: serial('id').primaryKey(),
    userId: uuid('user_id')
        .references(() => users.id)
        .notNull(),
    theme: text('theme').notNull(),
    content: text('content').notNull(),
    tensionLevel: integer('tension_level').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

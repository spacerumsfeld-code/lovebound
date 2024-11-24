import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from '../user/user.sql.ts'

export const stories = pgTable('stories', {
    id: serial().primaryKey().notNull(),
    ownerId: text('owner_id').notNull(),
    theme: text().notNull(),
    content: text().notNull(),
    tone: text().notNull(),
    tensionLevel: text('tension_level').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
        .defaultNow()
        .notNull(),
    title: text().notNull(),
    scenario: text(),
    setting: text().notNull(),
    coverUrl: text(),
})

export const storiesToUsersRelations = relations(stories, ({ one }) => ({
    stories: one(users, {
        fields: [stories.ownerId],
        references: [users.clerkId],
    }),
}))

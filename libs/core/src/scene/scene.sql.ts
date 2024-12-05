import { stories } from '../story/story.sql.ts'
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { items } from '../item/item.sql.ts'

export const scenes = pgTable('scenes', {
    // core
    id: serial('id').primaryKey(),
    storyId: integer('story_id')
        .notNull()
        .references(() => stories.id),
    content: text('content').notNull(),
    narrationUrl: text('narration_url'),
    orderIndex: integer('order_index').notNull(),
    // enums
    tone: integer('tone')
        .notNull()
        .references(() => items.id),
    setting: integer('setting')
        .notNull()
        .references(() => items.id),
    tensionLevel: integer('tension_level')
        .notNull()
        .references(() => items.id),
    // timestamps
    createdAt: timestamp('created_at', { mode: 'string' })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
        .defaultNow()
        .notNull(),
})

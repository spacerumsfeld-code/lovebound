import {
    boolean,
    integer,
    pgTable,
    serial,
    text,
    timestamp,
} from 'drizzle-orm/pg-core'
import { items } from '../item/item.sql'

export const stories = pgTable('stories', {
    // core
    id: serial('id').primaryKey(),
    ownerId: text('owner_id').notNull(),
    title: text('title').notNull(),
    coverUrl: text('cover_url').notNull(),
    inProgress: boolean('in_progress').notNull().default(true),
    // enums
    genre: integer('genre')
        .notNull()
        .references(() => items.id),
    theme: integer('theme')
        .notNull()
        .references(() => items.id),
    length: integer('length')
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

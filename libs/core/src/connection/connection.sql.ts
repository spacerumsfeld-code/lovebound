import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

// @TODO: switch to redis for connection management. for now we want development velocity

export const connections = pgTable('connections', {
    id: serial().primaryKey().notNull(),
    connectionId: text('connection_id').notNull(),
    userId: text('user_id').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
        .defaultNow()
        .notNull(),
})

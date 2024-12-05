import {
    boolean,
    integer,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
} from 'drizzle-orm/pg-core'
import { ItemTypeEnum } from './item.model.ts'

export const itemType = pgEnum(
    'item_type',
    Object.values(ItemTypeEnum) as [string, ...string[]],
)

export const items = pgTable('items', {
    // core
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    cost: integer('cost').notNull(),
    isDefault: boolean('is_default').default(false).notNull(),
    imageUrl: text('image_url'),
    // enums
    type: itemType('type').notNull().$type<ItemTypeEnum>(),
    // timestamp
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

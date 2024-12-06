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

/**
 * // New table for item packs
export const itemPacks = pgTable('item_packs', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  cost: integer('cost').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Junction table for pack items
export const packItems = pgTable('pack_items', {
  id: serial('id').primaryKey(),
  packId: integer('pack_id').notNull().references(() => itemPacks.id),
  itemId: integer('item_id').notNull().references(() => shopItems.id),
})
 */

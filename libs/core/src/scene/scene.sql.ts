import { relations } from 'drizzle-orm'
import { stories } from '../story/story.sql.ts'
import { TensionEnum, ToneEnum, SettingEnum } from './scene.model.ts'
import {
    integer,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
} from 'drizzle-orm/pg-core'

export const tensionEnum = pgEnum(
    'tension',
    Object.values(TensionEnum) as [string, ...string[]],
)
export const toneEnum = pgEnum(
    'tone',
    Object.values(ToneEnum) as [string, ...string[]],
)

export const settingEnum = pgEnum(
    'setting',
    Object.values(SettingEnum) as [string, ...string[]],
)

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
    tone: toneEnum('tone').notNull().$type<ToneEnum>(),
    setting: settingEnum('setting').notNull().$type<SettingEnum>(),
    tensionLevel: tensionEnum('tension_level').notNull().$type<TensionEnum>(),
    // timestamps
    createdAt: timestamp('created_at', { mode: 'string' })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
        .defaultNow()
        .notNull(),
})

export const scenesRelations = relations(scenes, ({ one }) => ({
    story: one(stories, {
        fields: [scenes.storyId],
        references: [stories.id],
    }),
}))

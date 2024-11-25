import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from '../user/user.sql.ts'
import {
    LengthEnum,
    SettingEnum,
    TensionEnum,
    ThemeEnum,
    ToneEnum,
} from '../story/story.model.ts'

export const tensionEnum = pgEnum(
    'tension',
    Object.values(TensionEnum) as [string, ...string[]],
)

export const themeEnum = pgEnum(
    'theme',
    Object.values(ThemeEnum) as [string, ...string[]],
)

export const toneEnum = pgEnum(
    'tone',
    Object.values(ToneEnum) as [string, ...string[]],
)

export const settingEnum = pgEnum(
    'setting',
    Object.values(SettingEnum) as [string, ...string[]],
)

export const lengthEnum = pgEnum(
    'length',
    Object.values(LengthEnum) as [string, ...string[]],
)

export const stories = pgTable('stories', {
    id: serial().primaryKey().notNull(),
    ownerId: text('owner_id').notNull(),
    content: text().notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
        .defaultNow()
        .notNull(),
    title: text().notNull(),
    scenario: text(),
    // enums
    theme: themeEnum('theme').notNull().$type<ThemeEnum>(),
    tone: toneEnum('tone').notNull().$type<ToneEnum>(),
    tensionLevel: tensionEnum('tension_level').notNull().$type<TensionEnum>(),
    setting: settingEnum('setting').notNull().$type<SettingEnum>(),
    coverUrl: text(),
    narrationUrl: text(),
    length: lengthEnum('length').notNull().$type<LengthEnum>(),
})

export const storiesToUsersRelations = relations(stories, ({ one }) => ({
    stories: one(users, {
        fields: [stories.ownerId],
        references: [users.clerkId],
    }),
}))

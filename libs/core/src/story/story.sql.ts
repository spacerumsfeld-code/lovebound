import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from '../user/user.sql.ts'
import { GenreEnum, LengthEnum, ThemeEnum } from '../story/story.model.ts'

export const genreEnum = pgEnum(
    'genre',
    Object.values(GenreEnum) as [string, ...string[]],
)
export const themeEnum = pgEnum(
    'theme',
    Object.values(ThemeEnum) as [string, ...string[]],
)
export const lengthEnum = pgEnum(
    'length',
    Object.values(LengthEnum) as [string, ...string[]],
)

export const stories = pgTable('stories', {
    // core
    id: serial('id').primaryKey(),
    ownerId: text('owner_id').notNull(),
    title: text('title').notNull(),
    coverUrl: text('cover_url'),
    // enums
    genre: genreEnum('genre').notNull().$type<GenreEnum>(),
    theme: themeEnum('theme').notNull().$type<ThemeEnum>(),
    length: lengthEnum('length').notNull().$type<LengthEnum>(),
    // timestamps
    createdAt: timestamp('created_at', { mode: 'string' })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
        .defaultNow()
        .notNull(),
})

export const storiesToUsersRelations = relations(stories, ({ one }) => ({
    stories: one(users, {
        fields: [stories.ownerId],
        references: [users.clerkId],
    }),
}))

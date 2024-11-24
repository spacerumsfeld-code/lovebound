import { pgTable, unique, uuid, text, timestamp, serial, real, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	clerkId: text("clerk_id").notNull(),
	email: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	birthday: text(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	profileImageUrl: text("profile_image_url"),
	gender: text(),
}, (table) => {
	return {
		usersClerkIdUnique: unique("users_clerk_id_unique").on(table.clerkId),
		usersEmailUnique: unique("users_email_unique").on(table.email),
	}
});

export const playingWithNeon = pgTable("playing_with_neon", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	value: real(),
});

export const stories = pgTable("stories", {
	id: serial().primaryKey().notNull(),
	ownerId: text("owner_id").notNull(),
	theme: text().notNull(),
	content: text().notNull(),
	tensionLevel: integer("tension_level").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	title: text().notNull(),
	scenario: text().notNull(),
	setting: text().notNull(),
});

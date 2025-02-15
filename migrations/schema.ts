import { pgTable, foreignKey, serial, text, boolean, integer, timestamp, unique, uuid, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const itemType = pgEnum("item_type", ['Genre', 'Theme', 'TensionLevel', 'Tone', 'Setting', 'Length', 'Pack', 'None'])


export const stories = pgTable("stories", {
	id: serial().primaryKey().notNull(),
	ownerId: text("owner_id").notNull(),
	title: text().notNull(),
	coverUrl: text("cover_url").notNull(),
	inProgress: boolean("in_progress").default(true).notNull(),
	genre: integer().notNull(),
	theme: integer().notNull(),
	length: integer().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => {
	return {
		storiesGenreItemsIdFk: foreignKey({
			columns: [table.genre],
			foreignColumns: [items.id],
			name: "stories_genre_items_id_fk"
		}),
		storiesThemeItemsIdFk: foreignKey({
			columns: [table.theme],
			foreignColumns: [items.id],
			name: "stories_theme_items_id_fk"
		}),
		storiesLengthItemsIdFk: foreignKey({
			columns: [table.length],
			foreignColumns: [items.id],
			name: "stories_length_items_id_fk"
		}),
	}
});

export const scenes = pgTable("scenes", {
	id: serial().primaryKey().notNull(),
	storyId: integer("story_id").notNull(),
	content: text().notNull(),
	narrationUrl: text("narration_url"),
	orderIndex: integer("order_index").notNull(),
	tone: integer().notNull(),
	setting: integer().notNull(),
	tensionLevel: integer("tension_level").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => {
	return {
		scenesStoryIdStoriesIdFk: foreignKey({
			columns: [table.storyId],
			foreignColumns: [stories.id],
			name: "scenes_story_id_stories_id_fk"
		}),
		scenesToneItemsIdFk: foreignKey({
			columns: [table.tone],
			foreignColumns: [items.id],
			name: "scenes_tone_items_id_fk"
		}),
		scenesSettingItemsIdFk: foreignKey({
			columns: [table.setting],
			foreignColumns: [items.id],
			name: "scenes_setting_items_id_fk"
		}),
		scenesTensionLevelItemsIdFk: foreignKey({
			columns: [table.tensionLevel],
			foreignColumns: [items.id],
			name: "scenes_tension_level_items_id_fk"
		}),
	}
});

export const userInventory = pgTable("user_inventory", {
	id: serial().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	itemId: integer("item_id").notNull(),
	purchasedAt: timestamp("purchased_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => {
	return {
		userInventoryUserIdUsersClerkIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.clerkId],
			name: "user_inventory_user_id_users_clerk_id_fk"
		}),
		userInventoryItemIdItemsIdFk: foreignKey({
			columns: [table.itemId],
			foreignColumns: [items.id],
			name: "user_inventory_item_id_items_id_fk"
		}),
	}
});

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	clerkId: text("clerk_id").notNull(),
	email: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	credits: integer().default(3).notNull(),
	gettingStartedCreateStory: boolean("getting_started_create_story").default(false),
	gettingStartedExploreShop: boolean("getting_started_explore_shop").default(false),
	gettingStartedTopUpCredits: boolean("getting_started_top_up_credits").default(false),
	gettingStartedPurchaseItem: boolean("getting_started_purchase_item").default(false),
	gettingStartedReferralUsed: boolean("getting_started_referral_used").default(false),
	referralCode: text("referral_code"),
}, (table) => {
	return {
		usersClerkIdUnique: unique("users_clerk_id_unique").on(table.clerkId),
		usersEmailUnique: unique("users_email_unique").on(table.email),
	}
});

export const items = pgTable("items", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	description: text().notNull(),
	cost: integer().notNull(),
	isDefault: boolean("is_default").default(false).notNull(),
	imageUrl: text("image_url").notNull(),
	type: itemType().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

import { pgTable, foreignKey, serial, text, boolean, integer, timestamp, unique, uuid, real, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const genre = pgEnum("genre", ['Contemporary Romance', 'Historical Romance', 'Fantasy Romance', 'Science Fiction Romance', 'Paranormal Romance', 'Romantic Thriller', 'Romantic Comedy', 'Romantic Drama', 'Romantic Adventure', 'Romantic Mystery'])
export const itemType = pgEnum("item_type", ['Genre', 'Theme', 'TensionLevel', 'Tone', 'Setting', 'Length'])
export const length = pgEnum("length", ['Mini', 'Short', 'Medium', 'Long', 'Novella'])
export const setting = pgEnum("setting", ['A cozy coffee shop', 'A dimly lit jazz bar', 'A bustling city park', 'A secluded beach at sunset', 'A small-town diner', 'A lavish cocktail party', 'A rustic barn', 'A mountain cabin during a snowstorm', 'A quiet library', 'A candlelit rooftop terrace', 'A rainy city street', 'A vintage bookshop', 'A flower-filled meadow', 'A moonlit garden', 'A quaint bed-and-breakfast', 'A crowded subway car', 'A lively farmer\'s market', 'An art gallery opening', 'A quaint seaside pier', 'A vineyard at harvest', 'A small fishing boat on the lake', 'An elegant ballroom', 'A bustling train station', 'A sunny countryside trail', 'A ski lodge by a roaring fire', 'A cozy bookstore café', 'A music festival under the stars', 'A serene forest clearing', 'A rooftop pool at a city hotel', 'A sunflower field in summer', 'A desert under a starlit sky', 'A local gym during a quiet evening', 'A charming village square', 'A crowded wedding reception', 'A carnival at night', 'A boat dock at sunrise', 'A high-rise office after hours', 'A college campus library', 'A public garden in bloom', 'A train car on a long journey', 'A rainy lakeside cabin', 'A small chapel in the woods', 'A hidden speakeasy', 'A private plane mid-flight', 'A quiet fishing dock', 'A backyard barbecue', 'A bustling outdoor market', 'A dimly lit movie theater', 'A picturesque lighthouse', 'A historical mansion on a stormy night'])
export const tension = pgEnum("tension", ['Low', 'Medium', 'High', 'Intense', 'Max'])
export const theme = pgEnum("theme", ['Forbidden romance', 'Best friends to lovers', 'Strangers with instant chemistry', 'Second-chance romance', 'Enemies to lovers', 'Opposites attract', 'Workplace romance', 'A missed connection finally realized', 'Secret admirer revealed', 'Love rekindled after years apart'])
export const tone = pgEnum("tone", ['Dreamy', 'Intense', 'Playful', 'Passionate', 'Lighthearted', 'Mysterious', 'Whimsical', 'Emotional', 'Tender', 'Sultry'])


export const stories = pgTable("stories", {
	id: serial().primaryKey().notNull(),
	ownerId: text("owner_id").notNull(),
	title: text().notNull(),
	coverUrl: text("cover_url"),
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

export const items = pgTable("items", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	description: text().notNull(),
	cost: integer().notNull(),
	isDefault: boolean("is_default").default(false).notNull(),
	imageUrl: text("image_url"),
	type: itemType().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	clerkId: text("clerk_id").notNull(),
	email: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	profileImageUrl: text("profile_image_url"),
	credits: integer().default(3).notNull(),
}, (table) => {
	return {
		usersClerkIdUnique: unique("users_clerk_id_unique").on(table.clerkId),
		usersEmailUnique: unique("users_email_unique").on(table.email),
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

export const playingWithNeon = pgTable("playing_with_neon", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	value: real(),
});

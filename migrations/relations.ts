import { relations } from "drizzle-orm/relations";
import { items, stories, scenes, users, userInventory } from "./schema";

export const storiesRelations = relations(stories, ({one, many}) => ({
	item_genre: one(items, {
		fields: [stories.genre],
		references: [items.id],
		relationName: "stories_genre_items_id"
	}),
	item_theme: one(items, {
		fields: [stories.theme],
		references: [items.id],
		relationName: "stories_theme_items_id"
	}),
	item_length: one(items, {
		fields: [stories.length],
		references: [items.id],
		relationName: "stories_length_items_id"
	}),
	scenes: many(scenes),
}));

export const itemsRelations = relations(items, ({many}) => ({
	stories_genre: many(stories, {
		relationName: "stories_genre_items_id"
	}),
	stories_theme: many(stories, {
		relationName: "stories_theme_items_id"
	}),
	stories_length: many(stories, {
		relationName: "stories_length_items_id"
	}),
	scenes_tone: many(scenes, {
		relationName: "scenes_tone_items_id"
	}),
	scenes_setting: many(scenes, {
		relationName: "scenes_setting_items_id"
	}),
	scenes_tensionLevel: many(scenes, {
		relationName: "scenes_tensionLevel_items_id"
	}),
	userInventories: many(userInventory),
}));

export const scenesRelations = relations(scenes, ({one}) => ({
	story: one(stories, {
		fields: [scenes.storyId],
		references: [stories.id]
	}),
	item_tone: one(items, {
		fields: [scenes.tone],
		references: [items.id],
		relationName: "scenes_tone_items_id"
	}),
	item_setting: one(items, {
		fields: [scenes.setting],
		references: [items.id],
		relationName: "scenes_setting_items_id"
	}),
	item_tensionLevel: one(items, {
		fields: [scenes.tensionLevel],
		references: [items.id],
		relationName: "scenes_tensionLevel_items_id"
	}),
}));

export const userInventoryRelations = relations(userInventory, ({one}) => ({
	user: one(users, {
		fields: [userInventory.userId],
		references: [users.clerkId]
	}),
	item: one(items, {
		fields: [userInventory.itemId],
		references: [items.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	userInventories: many(userInventory),
}));
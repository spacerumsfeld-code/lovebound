ALTER TABLE "shop_items" RENAME TO "items";--> statement-breakpoint
ALTER TABLE "scenes" DROP CONSTRAINT "scenes_tone_shop_items_id_fk";
--> statement-breakpoint
ALTER TABLE "scenes" DROP CONSTRAINT "scenes_setting_shop_items_id_fk";
--> statement-breakpoint
ALTER TABLE "scenes" DROP CONSTRAINT "scenes_tension_level_shop_items_id_fk";
--> statement-breakpoint
ALTER TABLE "stories" DROP CONSTRAINT "stories_genre_shop_items_id_fk";
--> statement-breakpoint
ALTER TABLE "stories" DROP CONSTRAINT "stories_theme_shop_items_id_fk";
--> statement-breakpoint
ALTER TABLE "stories" DROP CONSTRAINT "stories_length_shop_items_id_fk";
--> statement-breakpoint
ALTER TABLE "user_inventory" DROP CONSTRAINT "user_inventory_item_id_shop_items_id_fk";
--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scenes" ADD CONSTRAINT "scenes_tone_items_id_fk" FOREIGN KEY ("tone") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scenes" ADD CONSTRAINT "scenes_setting_items_id_fk" FOREIGN KEY ("setting") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scenes" ADD CONSTRAINT "scenes_tension_level_items_id_fk" FOREIGN KEY ("tension_level") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stories" ADD CONSTRAINT "stories_genre_items_id_fk" FOREIGN KEY ("genre") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stories" ADD CONSTRAINT "stories_theme_items_id_fk" FOREIGN KEY ("theme") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stories" ADD CONSTRAINT "stories_length_items_id_fk" FOREIGN KEY ("length") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_inventory" ADD CONSTRAINT "user_inventory_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations

CREATE TYPE "public"."genre" AS ENUM('Contemporary Romance', 'Historical Romance', 'Fantasy Romance', 'Science Fiction Romance', 'Paranormal Romance', 'Romantic Thriller', 'Romantic Comedy', 'Romantic Drama', 'Romantic Adventure', 'Romantic Mystery');--> statement-breakpoint
CREATE TYPE "public"."length" AS ENUM('Mini', 'Short', 'Medium', 'Long', 'Novella');--> statement-breakpoint
CREATE TYPE "public"."setting" AS ENUM('A cozy coffee shop', 'A dimly lit jazz bar', 'A bustling city park', 'A secluded beach at sunset', 'A small-town diner', 'A lavish cocktail party', 'A rustic barn', 'A mountain cabin during a snowstorm', 'A quiet library', 'A candlelit rooftop terrace', 'A rainy city street', 'A vintage bookshop', 'A flower-filled meadow', 'A moonlit garden', 'A quaint bed-and-breakfast', 'A crowded subway car', 'A lively farmer''s market', 'An art gallery opening', 'A quaint seaside pier', 'A vineyard at harvest', 'A small fishing boat on the lake', 'An elegant ballroom', 'A bustling train station', 'A sunny countryside trail', 'A ski lodge by a roaring fire', 'A cozy bookstore café', 'A music festival under the stars', 'A serene forest clearing', 'A rooftop pool at a city hotel', 'A sunflower field in summer', 'A desert under a starlit sky', 'A local gym during a quiet evening', 'A charming village square', 'A crowded wedding reception', 'A carnival at night', 'A boat dock at sunrise', 'A high-rise office after hours', 'A college campus library', 'A public garden in bloom', 'A train car on a long journey', 'A rainy lakeside cabin', 'A small chapel in the woods', 'A hidden speakeasy', 'A private plane mid-flight', 'A quiet fishing dock', 'A backyard barbecue', 'A bustling outdoor market', 'A dimly lit movie theater', 'A picturesque lighthouse', 'A historical mansion on a stormy night');--> statement-breakpoint
CREATE TYPE "public"."tension" AS ENUM('Low', 'Medium', 'High', 'Intense', 'Max');--> statement-breakpoint
CREATE TYPE "public"."theme" AS ENUM('Forbidden romance', 'Best friends to lovers', 'Strangers with instant chemistry', 'Second-chance romance', 'Enemies to lovers', 'Opposites attract', 'Workplace romance', 'A missed connection finally realized', 'Secret admirer revealed', 'Love rekindled after years apart');--> statement-breakpoint
CREATE TYPE "public"."tone" AS ENUM('Dreamy', 'Intense', 'Playful', 'Passionate', 'Lighthearted', 'Mysterious', 'Whimsical', 'Emotional', 'Tender', 'Sultry');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "playing_with_neon" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"value" real
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"first_name" text,
	"last_name" text,
	"profile_image_url" text,
	"credits" integer DEFAULT 3 NOT NULL,
	"deleted" boolean DEFAULT false,
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stories" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner_id" text NOT NULL,
	"title" text NOT NULL,
	"cover_url" text,
	"in_progress" boolean DEFAULT true NOT NULL,
	"genre" integer NOT NULL,
	"theme" integer NOT NULL,
	"length" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scenes" (
	"id" serial PRIMARY KEY NOT NULL,
	"story_id" integer NOT NULL,
	"content" text NOT NULL,
	"narration_url" text,
	"order_index" integer NOT NULL,
	"tone" integer NOT NULL,
	"setting" integer NOT NULL,
	"tension_level" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_inventory" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"item_id" integer NOT NULL,
	"purchased_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"cost" integer NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"image_url" text,
	"type" "item_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
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
 ALTER TABLE "scenes" ADD CONSTRAINT "scenes_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
 ALTER TABLE "user_inventory" ADD CONSTRAINT "user_inventory_user_id_users_clerk_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("clerk_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_inventory" ADD CONSTRAINT "user_inventory_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

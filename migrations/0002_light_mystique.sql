ALTER TABLE "public"."items" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."item_type";--> statement-breakpoint
CREATE TYPE "public"."item_type" AS ENUM('Genre', 'Theme', 'TensionLevel', 'Tone', 'Setting', 'Length');--> statement-breakpoint
ALTER TABLE "public"."items" ALTER COLUMN "type" SET DATA TYPE "public"."item_type" USING "type"::"public"."item_type";
CREATE TYPE "public"."length" AS ENUM('Mini', 'Short', 'Medium', 'Long', 'Novella');--> statement-breakpoint
ALTER TABLE "stories" ADD COLUMN "length" "length" NOT NULL;
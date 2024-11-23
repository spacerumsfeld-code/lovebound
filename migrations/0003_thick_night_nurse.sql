ALTER TABLE "users" DROP CONSTRAINT "users_email_address_unique";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "email_address";
DROP INDEX IF EXISTS "unique_city_set";--> statement-breakpoint
ALTER TABLE "city_sets" ADD COLUMN "description" text;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_city_set" ON "city_sets" USING btree ("country","country_code","city");--> statement-breakpoint
ALTER TABLE "city_sets" DROP COLUMN IF EXISTS "district";
DROP INDEX IF EXISTS "unique_city_set";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_city_set" ON "city_sets" USING btree ("country","city");
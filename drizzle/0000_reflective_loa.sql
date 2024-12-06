CREATE TABLE IF NOT EXISTS "city_sets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"country" text NOT NULL,
	"country_code" text,
	"city" text NOT NULL,
	"district" text,
	"cover_photo_id" uuid,
	"photo_count" integer DEFAULT 0,
	"create_at" timestamp DEFAULT now(),
	"update_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"isFavorite" boolean DEFAULT false,
	"aspect_ratio" real NOT NULL,
	"width" real NOT NULL,
	"height" real NOT NULL,
	"blur_data" text NOT NULL,
	"country" text,
	"country_code" text,
	"region" text,
	"city" text,
	"district" text,
	"full_address" text,
	"place_formatted" text,
	"make" varchar(255),
	"model" varchar(255),
	"lens_model" varchar(255),
	"focal_length" real,
	"focal_length_35mm" real,
	"f_number" real,
	"iso" integer,
	"exposure_time" real,
	"exposure_compensation" real,
	"latitude" real,
	"longitude" real,
	"gps_altitude" real,
	"datetime_original" timestamp,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"update_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"image" text,
	"password" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "city_sets" ADD CONSTRAINT "city_sets_cover_photo_id_photos_id_fk" FOREIGN KEY ("cover_photo_id") REFERENCES "public"."photos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_city_set" ON "city_sets" USING btree ("country","country_code","city","district");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "year_idx" ON "photos" USING btree (DATE_TRUNC('year', "datetime_original"));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "city_idx" ON "photos" USING btree ("city");
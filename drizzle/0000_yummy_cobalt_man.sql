CREATE TABLE IF NOT EXISTS "photos" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"isFavorite" boolean DEFAULT false,
	"aspect_ratio" real NOT NULL,
	"width" real NOT NULL,
	"height" real NOT NULL,
	"blur_data" text NOT NULL,
	"location_name" varchar(255),
	"make" varchar(255),
	"model" varchar(255),
	"lens_model" varchar(255),
	"focal_length" real,
	"focal_length_35mm" real,
	"f_number" real,
	"iso" integer,
	"exposure_time" real,
	"exposure_compensation" real,
	"gps_latitude" real,
	"gps_longitude" real,
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

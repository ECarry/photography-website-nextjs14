import {
  boolean,
  timestamp,
  pgTable,
  text,
  real,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  image: text("image"),
  password: text("password"),
});

export const photos = pgTable("photos", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  url: text("url").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  isFavorite: boolean("isFavorite").default(false),
  aspectRatio: real("aspect_ratio").notNull(),
  width: real("width").notNull(),
  height: real("height").notNull(),
  blurData: text("blur_data").notNull(),
  locationName: varchar("location_name", { length: 255 }),

  // EXIF DATA
  make: varchar("make", { length: 255 }),
  model: varchar("model", { length: 255 }),
  lensModel: varchar("lens_model", { length: 255 }),
  focalLength: real("focal_length"),
  focalLength35mm: real("focal_length_35mm"),
  fNumber: real("f_number"),
  iso: integer("iso"),
  exposureTime: real("exposure_time"),
  exposureCompensation: real("exposure_compensation"),
  gapLatitude: real("gps_latitude"),
  gapLongitude: real("gps_longitude"),
  gpsAltitude: real("gps_altitude"),
  dateTimeOriginal: timestamp("datetime_original"),

  createAt: timestamp("create_at").notNull().defaultNow(),
  updateAt: timestamp("update_at").$onUpdate(() => new Date()),
});

export const insertPhotoSchema = createInsertSchema(photos);

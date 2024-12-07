import { relations, sql } from "drizzle-orm";
import {
  boolean,
  timestamp,
  pgTable,
  text,
  real,
  varchar,
  integer,
  uuid,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  image: text("image"),
  password: text("password"),
});

export const photos = pgTable(
  "photos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    url: text("url").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    isFavorite: boolean("isFavorite").default(false),
    aspectRatio: real("aspect_ratio").notNull(),
    width: real("width").notNull(),
    height: real("height").notNull(),
    blurData: text("blur_data").notNull(),

    // GEO DATA
    country: text("country"),
    countryCode: text("country_code"),
    region: text("region"),
    city: text("city"),
    district: text("district"),

    fullAddress: text("full_address"),
    placeFormatted: text("place_formatted"),

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
    latitude: real("latitude"),
    longitude: real("longitude"),
    gpsAltitude: real("gps_altitude"),
    dateTimeOriginal: timestamp("datetime_original"),

    createAt: timestamp("create_at").notNull().defaultNow(),
    updateAt: timestamp("update_at").$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      yearIdx: index("year_idx").on(
        sql`DATE_TRUNC('year', ${table.dateTimeOriginal})`
      ),
      cityIdx: index("city_idx").on(table.city),
    };
  }
);

export const citySets = pgTable(
  "city_sets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    description: text("description"),

    // GEO DATA
    country: text("country").notNull(),
    countryCode: text("country_code"),
    city: text("city").notNull(),

    // COVER PHOTO
    coverPhotoId: uuid("cover_photo_id").references(() => photos.id),

    photoCount: integer("photo_count").default(0),

    // META DATA
    createAt: timestamp("create_at").defaultNow(),
    updateAt: timestamp("update_at").defaultNow(),
  },
  (table) => {
    return {
      uniqueCitySet: uniqueIndex("unique_city_set").on(
        table.country,
        table.city
      ),
    };
  }
);

export const citySetRelations = relations(citySets, ({ many }) => ({
  photos: many(photos),
}));

export const photoRelations = relations(photos, ({ one }) => ({
  citySet: one(citySets, {
    fields: [photos.country, photos.city],
    references: [citySets.country, citySets.city],
  }),
}));

// Schema
export const insertPhotoSchema = createInsertSchema(photos)
  .extend({
    dateTimeOriginal: z
      .string()
      .nullable()
      .transform((val) => (val ? new Date(val) : null)),
  })
  .omit({
    createAt: true,
    updateAt: true,
  });

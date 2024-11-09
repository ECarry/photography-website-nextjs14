import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  real,
  varchar,
  smallint,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

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

  make: varchar("make", { length: 255 }),
  model: varchar("model", { length: 255 }),
  lensModel: varchar("lens_model", { length: 255 }),
  focalLength: real("focal_length"),
  focalLength35mm: varchar("focal_length_35mm"),
  fNumber: real("f_number"),
  iso: smallint("iso"),
  exposureTime: real("exposure_time"),
  exposureCompensation: varchar("exposure_compensation"),
  locationName: varchar("location_name", { length: 255 }),
  latitude: real("latitude"),
  longitude: real("longitude"),
  gpsAltitude: real("gps_altitude"),
  takeAt: text("take_at"),

  createAt: timestamp("create_at").notNull().defaultNow(),
  updateAt: timestamp("update_at").$onUpdate(() => new Date()),
});

export const insertPhotoSchema = createInsertSchema(photos);

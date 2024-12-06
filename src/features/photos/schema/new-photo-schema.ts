import * as z from "zod";

// country: text("country"),
// countryCode: text("country_code"),
// region: text("region"),
// city: text("city"),
// district: text("district"),

// locationName: text("location_name"),
// fullAddress: text("full_address"),
// placeFormatted: text("place_formatted"),

export const photoSchema = z.object({
  url: z.string(),
  title: z.string(),
  description: z.string(),
  // isFavorite: z.boolean().default(false),
  // aspectRatio: z.number(),
  // width: z.number(),
  // height: z.number(),
  // blurData: z.string(),
  // locationName: z.string().optional(),
  // make: z.string().optional(),
  // model: z.string().optional(),
  // lensModel: z.string().optional(),
  // focalLength: z.number().optional(),
  // focalLength35mm: z.number().optional(),
  // fNumber: z.number().optional(),
  // iso: z.number().optional(),
  // exposureTime: z.number().optional(),
  // exposureCompensation: z.number().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  // gpsAltitude: z.number().optional(),
  // dateTimeOriginal: z.string().optional(),

  country: z.string().optional(),
  countryCode: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),

  fullAddress: z.string().optional(),
  placeFormatted: z.string().optional(),
});

export type PhotoFormData = z.infer<typeof photoSchema>;

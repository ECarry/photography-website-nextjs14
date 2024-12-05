import * as z from "zod";

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
  gpsLatitude: z.number().optional(),
  gpsLongitude: z.number().optional(),
  // gpsAltitude: z.number().optional(),
  // dateTimeOriginal: z.string().optional(),
});

export type PhotoFormData = z.infer<typeof photoSchema>;

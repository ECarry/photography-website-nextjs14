import * as z from "zod";

export const photoSchema = z.object({
  url: z.string().min(1, {
    message: "Image is required",
  }),
  title: z.string(),
  description: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),

  country: z.string().optional(),
  countryCode: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),

  fullAddress: z.string().optional(),
  placeFormatted: z.string().optional(),
});

export type PhotoFormData = z.infer<typeof photoSchema>;

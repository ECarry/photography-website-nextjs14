import * as z from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title is required",
    })
    .max(50, {
      message: "Title must be less than 50 characters",
    }),
  description: z.string(),
  slug: z
    .string()
    .min(1, {
      message: "Slug is required",
    })
    .max(50, {
      message: "Slug must be less than 50 characters",
    }),
  coverImage: z.string().optional(),
});

export type PostFormData = z.infer<typeof postSchema>;

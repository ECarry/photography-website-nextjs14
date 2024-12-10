import * as z from "zod";

export const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
});

export type PostFormData = z.infer<typeof postSchema>;

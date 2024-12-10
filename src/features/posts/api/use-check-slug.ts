import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type CheckSlugResponse = InferResponseType<
  (typeof client.api.posts)["check-slug"][":slug"]["$get"],
  200
>;

export const useCheckSlug = (slug: string) => {
  return useQuery<CheckSlugResponse>({
    queryKey: ["check-slug", slug],
    queryFn: async () => {
      if (!slug) return { exists: false };

      const response = await client.api.posts["check-slug"][":slug"].$get({
        param: { slug },
      });

      if (!response.ok) {
        throw new Error("Failed to check slug");
      }
      return response.json();
    },
    enabled: !!slug, // Only run query if slug exists
  });
};

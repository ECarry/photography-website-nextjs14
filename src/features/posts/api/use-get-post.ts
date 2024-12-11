import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export type ResponseType = InferResponseType<
  (typeof client.api.posts)[":slug"]["$get"],
  200
>;

export const useGetPost = (slug: string) => {
  const query = useQuery({
    enabled: !!slug,
    queryKey: ["post", { slug }],
    queryFn: async () => {
      const response = await client.api.posts[":slug"].$get({
        param: {
          slug,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};

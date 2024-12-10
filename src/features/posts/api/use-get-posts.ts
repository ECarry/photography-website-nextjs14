import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  (typeof client.api.posts)["$get"],
  200
>;

export const useGetPosts = () => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await client.api.posts.$get();

      if (!res.ok) throw new Error("Failed to fetch posts");

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};

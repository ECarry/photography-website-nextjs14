import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  (typeof client.api.photos)["$get"],
  200
>;

export const useGetPhoto = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["photo", { id }],
    queryFn: async () => {
      const res = await client.api.photos[":id"].$get({ param: { id } });

      if (!res.ok) throw new Error("Failed to fetch photos");

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};

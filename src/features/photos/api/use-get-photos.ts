import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  (typeof client.api.photos)["$get"],
  200
>;

export const useGetPhotos = () => {
  const query = useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      const res = await client.api.photos.$get();

      if (!res.ok) throw new Error("Failed to fetch photos");

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};

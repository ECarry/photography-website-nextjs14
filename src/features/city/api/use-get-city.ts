import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  (typeof client.api.city)["$get"],
  200
>;

export const useGetCity = () => {
  const query = useQuery({
    queryKey: ["city"],
    queryFn: async () => {
      const res = await client.api.city.$get();

      if (!res.ok) throw new Error("Failed to fetch city");

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};

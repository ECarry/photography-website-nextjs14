import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/app/api/[[...route]]/city";

export const useGetCitySets = () => {
  const query = useQuery({
    queryKey: ["city"],
    queryFn: async () => {
      const res = await client.api.city.$get();

      if (!res.ok) throw new Error("Failed to fetch city sets");

      const { data } = (await res.json()) as ApiResponse;

      return data;
    },
  });

  return query;
};

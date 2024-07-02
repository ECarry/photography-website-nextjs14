import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetPhoto = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["photo", { id }],
    queryFn: async () => {
      const res = await client.api.photos[":id"].$get({
        param: { id },
      });

      if (!res.ok) {
        throw new Error("Get photo wrong");
      }

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};

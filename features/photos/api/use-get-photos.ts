import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetPhotos = () => {
  const params = useSearchParams();
  const year = params.get("year") || "";
  const sortBy = params.get("sortBy") || "";

  const query = useQuery({
    queryKey: ["photos", year, sortBy],
    queryFn: async () => {
      const res = await client.api.photos.$get({
        query: {
          year,
          sortBy,
        },
      });

      if (!res.ok) {
        throw new Error("Get photos wrong");
      }

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};

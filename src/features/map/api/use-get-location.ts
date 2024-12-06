import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  (typeof client.api.map.location)["$get"],
  200
>["data"];

export type RequestType = InferRequestType<
  (typeof client.api.map.location)["$get"]
>["query"];

export const useGetLocation = (query: RequestType) => {
  return useQuery({
    queryKey: ["location", query.lat, query.lng],
    queryFn: async () => {
      const res = await client.api.map.location.$get({ query });

      const responseData = await res.json();

      if ("error" in responseData) {
        throw new Error(
          responseData.error ||
            responseData.details ||
            "Failed to fetch location"
        );
      }

      return responseData.data;
    },
  });
};

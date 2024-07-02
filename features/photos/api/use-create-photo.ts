import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.photos.$post>;
type RequestType = InferRequestType<typeof client.api.photos.$post>["json"];

export const useCreatePhoto = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.photos.$post({ json });

      return await res.json();
    },
    onSuccess: () => {
      toast.success("Photo created");
      queryClient.invalidateQueries({
        queryKey: ["photos"],
      });
    },
    onError: () => {
      toast.error("Failed to create photo");
    },
  });

  return mutation;
};

import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.photos)[":id"]["$patch"]
>;

type RequestType = InferRequestType<
  (typeof client.api.photos)[":id"]["$patch"]
>["json"];

export const useEditPhoto = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.photos[":id"]["$patch"]({
        param: { id },
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Photo updated");
      queryClient.invalidateQueries({
        queryKey: ["photo", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["photos"],
      });
    },
    onError: () => {
      toast.error("Failed to update photo");
    },
  });

  return mutation;
};

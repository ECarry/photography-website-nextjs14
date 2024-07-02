import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.photos)[":id"]["$delete"]
>;

export const useDeletePhoto = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const res = await client.api.photos[":id"]["$delete"]({ param: { id } });

      return await res.json();
    },
    onSuccess: () => {
      toast.success("Photo deleted");
      queryClient.invalidateQueries({
        queryKey: ["photo", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["photos"],
      });
    },
    onError: () => {
      toast.error("Error deleting photo");
    },
  });

  return mutation;
};

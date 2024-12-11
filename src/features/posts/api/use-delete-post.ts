import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.posts)[":id"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.posts)[":id"]["$delete"]
>["param"];

/**
 * Helper function to handle API errors
 * @param error - The error object caught in the try-catch block
 * @throws {Error} - Throws an error with a descriptive message
 */
const handleApiError = (error: unknown): never => {
  if (error instanceof Error) {
    throw new Error(`API Error: ${error.message}`);
  }
  throw new Error("An unknown error occurred");
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (param) => {
      const response = await client.api.posts[":id"].$delete({ param });

      if (!response.ok) {
        throw new Error("Failed to create photo");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", { id: data.id }] });
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      handleApiError(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete photo"
      );
    },
  });

  return mutation;
};

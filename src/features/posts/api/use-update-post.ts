import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

export type ResponseType = InferResponseType<
  (typeof client.api.posts)[":slug"]["$patch"],
  200
>;
export type RequestType = InferRequestType<
  (typeof client.api.posts)[":slug"]["$patch"]
>["json"];

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

export const useUpdatePost = (slug: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["posts", { slug }],
    mutationFn: async (json) => {
      const response = await client.api.posts[":slug"].$patch({
        json,
        param: { slug },
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", { slug }] });
      toast.success("Post updated successfully");
    },
    onError: (error) => {
      handleApiError(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    },
  });

  return mutation;
};

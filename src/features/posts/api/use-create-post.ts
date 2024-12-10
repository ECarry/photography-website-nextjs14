import { toast } from "sonner";
import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<(typeof client.api.posts)["$post"], 200>;
type RequestType = InferRequestType<(typeof client.api.posts)["$post"]>["json"];

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

/**
 * Hook to create a new post to the database
 * @returns {UseMutationResult} - The mutation result for creating a post
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await client.api.posts.$post({ json: data });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully");
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

import { toast } from "sonner";
import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.photos)[":id"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.photos)[":id"]["$delete"]
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

/**
 * Hook to create a new photo to the database
 * @returns {UseMutationResult} - The mutation result for creating a photo
 */
export const useDeletePhoto = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (param) => {
      const response = await client.api.photos[":id"].$delete({ param });

      if (!response.ok) {
        throw new Error("Failed to create photo");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
      queryClient.invalidateQueries({ queryKey: ["photos", { id: data.id }] });
      toast.success("Photo deleted successfully");
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

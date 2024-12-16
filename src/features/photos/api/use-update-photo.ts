import { toast } from "sonner";
import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.photos)[":id"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.photos)[":id"]["$patch"]
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

/**
 * Hook to update a photo in the database
 * @returns {UseMutationResult} - The mutation result for updating a photo
 */
export const useUpdatePhoto = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["photos", { id }],
    mutationFn: async (json) => {
      const response = await client.api.photos[":id"].$patch({
        json,
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to update photo");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
      queryClient.invalidateQueries({ queryKey: ["photos", { id }] });
      toast.success("Photo updated successfully");
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

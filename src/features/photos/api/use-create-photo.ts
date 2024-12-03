import { toast } from "sonner";
import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<(typeof client.api.photos)["$post"], 200>;
type RequestType = InferRequestType<
  (typeof client.api.photos)["$post"]
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
 * Hook to create a new photo to the database
 * @returns {UseMutationResult} - The mutation result for creating a photo
 */
export const useCreatePhoto = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const formattedValues = {
        ...json,
        dateTimeOriginal: json.dateTimeOriginal?.toString() ?? null,
      };
      const response = await client.api.photos.$post({ json: formattedValues });

      if (!response.ok) {
        throw new Error("Failed to create photo");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
      toast.success("Photo created successfully");
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

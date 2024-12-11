import { toast } from "sonner";
import { client } from "@/lib/hono";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<(typeof client.api.r2)["$post"], 200>;
type RequestType = {
  file: File;
  folder: string;
  onSuccess?: (data: { publicUrl: string; filename: string }) => void;
  onProgress?: (progress: number) => void;
};

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
 * Hook to upload a photo to R2
 * @returns {UseMutationResult} - The mutation result for uploading a photo
 */
export const useUploadPhoto = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType["data"], Error, RequestType>({
    mutationFn: async ({ file, folder, onProgress }) => {
      try {
        console.log("Starting upload process...");
        // 1. 获取预签名 URL
        const response = await client.api.r2.$post({
          json: {
            filename: file.name,
            contentType: file.type,
            folder,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Server error:", errorData);
          throw new Error("Failed to get upload URL");
        }

        const { data } = await response.json();
        console.log("Got presigned URL:", data.uploadUrl);

        // 2. 使用预签名 URL 上传到 R2，使用 XMLHttpRequest 来获取进度
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded * 100) / event.total);
              onProgress?.(progress);
            }
          });

          xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              console.log("Upload completed successfully");
              resolve({
                publicUrl: data.publicUrl,
                filename: data.filename,
                uploadUrl: data.uploadUrl,
              });
            } else {
              reject(new Error("Failed to upload file to R2"));
            }
          });

          xhr.addEventListener("error", () => {
            reject(new Error("Failed to upload file to R2"));
          });

          xhr.open("PUT", data.uploadUrl);
          xhr.setRequestHeader("Content-Type", file.type);
          xhr.send(file);
        });
      } catch (error) {
        console.error("Upload error:", error);
        throw error;
      }
    },
    onSuccess: (data, { onSuccess }) => {
      toast.success("Photo uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["photos"] });
      onSuccess?.(data);
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

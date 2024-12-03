import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

interface UploadPhotoParams {
  file: File;
  onSuccess?: (data: { publicUrl: string; filename: string }) => void;
  onProgress?: (progress: number) => void;
}

interface UploadResponse {
  publicUrl: string;
  filename: string;
}

export const useUploadPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, onProgress }: UploadPhotoParams) => {
      try {
        console.log("Starting upload process...");
        console.log("File:", {
          name: file.name,
          type: file.type,
          size: file.size,
        });

        // 1. 获取预签名 URL
        const response = await client.api.r2.$post({
          json: {
            filename: file.name,
            contentType: file.type,
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
        return new Promise<UploadResponse>((resolve, reject) => {
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
      console.error("Mutation error:", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    },
  });
};

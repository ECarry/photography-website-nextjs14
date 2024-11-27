import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type UploadPhotoParams = {
  file: File;
  onSuccess?: (data: { publicUrl: string; filename: string }) => void;
};

export const useUploadPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file }: UploadPhotoParams) => {
      try {
        console.log("Starting upload process...");
        console.log("File:", {
          name: file.name,
          type: file.type,
          size: file.size,
        });

        // 1. 获取预签名 URL
        const response = await client.api.photos.upload.$post({
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

        // 2. 使用预签名 URL 上传到 R2
        const uploadRes = await fetch(data.uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        if (!uploadRes.ok) {
          throw new Error("Failed to upload file to R2");
        }

        console.log("Upload completed successfully");
        return {
          publicUrl: data.publicUrl,
          filename: data.filename,
        };
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

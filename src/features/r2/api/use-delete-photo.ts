import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeletePhoto = () => {
  return useMutation({
    mutationFn: async ({ filename }: { filename: string }) => {
      const response = await client.api.r2.delete.$delete({
        json: { filename },
      });

      if (!response.ok) {
        throw new Error("Failed to delete file from R2");
      }

      return response;
    },
    onSuccess: () => {
      toast.success("File deleted successfully from R2");
    },
    onError: (error) => {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file from R2");
    },
  });
};

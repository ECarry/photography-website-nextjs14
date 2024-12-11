"use client";

import { useUploadPhoto } from "../api/use-upload-photo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import Image from "next/image";

interface PostCoverUploadProps {
  value?: string;
  onChange: (value: string) => void;
}

const PostCoverUpload = ({ value, onChange }: PostCoverUploadProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const uploadPhoto = useUploadPhoto();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadPhoto.mutate(
      {
        file,
        folder: "covers",
        onProgress: (progress) => {
          setUploadProgress(progress);
        },
        onSuccess: ({ publicUrl }) => {
          onChange(publicUrl);
          setUploadProgress(0);
        },
      },
      {
        onError: (error) => {
          console.error("Upload failed:", error);
          setUploadProgress(0);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden rounded-lg border bg-muted",
          value && "bg-transparent"
        )}
      >
        {value ? (
          <Image
            src={value}
            alt="Cover"
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">No cover image</p>
          </div>
        )}
      </div>

      {uploadProgress > 0 && (
        <Progress value={uploadProgress} className="h-1 w-full" />
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit"
        disabled={uploadProgress > 0}
        asChild
      >
        <label>
          {value ? "Change cover" : "Add cover"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </Button>
    </div>
  );
};

export default PostCoverUpload;

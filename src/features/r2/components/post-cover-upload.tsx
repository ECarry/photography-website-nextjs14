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
  className?: string;
}

const PostCoverUpload = ({ value, onChange }: PostCoverUploadProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [url, setUrl] = useState(value);
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
          setUrl(publicUrl);
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
    <div className="relative w-full">
      <div
        className={cn(
          "relative h-[500px] w-full bg-muted",
          value && "bg-transparent"
        )}
      >
        {url ? (
          <Image
            src={url}
            alt="Cover"
            className="object-cover rounded-lg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">No cover image</p>
          </div>
        )}

        <Button
          variant="outline"
          size="lg"
          className="w-fit absolute -bottom-4 left-8 z-10"
          disabled={uploadProgress > 0}
          asChild
        >
          <label>
            {url ? "Change cover" : "Add cover"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </Button>
      </div>

      {uploadProgress > 0 && (
        <Progress
          value={uploadProgress}
          className="h-1 w-full absolute top-0"
        />
      )}
    </div>
  );
};

export default PostCoverUpload;

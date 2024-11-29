/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { ImageIcon, Loader2 } from "lucide-react";
import { Blurhash } from "react-blurhash";

import {
  getImageInfo,
  getPhotoExif,
  type ImageInfo,
  type ExifData,
} from "@/features/photos/utils";

import { useUploadPhoto } from "@/features/photos/api/use-upload-photo";
import { Icons } from "../icons";

interface FileUploadProps {
  onChange?: (data: {
    url: string;
    imageInfo?: ImageInfo;
    exif?: ExifData;
  }) => void;
  value?: string;
  className?: string;
  dropzoneOptions?: Record<string, unknown>;
}

export function FileUpload({
  className,
  onChange,
  value,
  dropzoneOptions,
}: FileUploadProps) {
  const [blurhash, setBlurhash] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const uploadMutation = useUploadPhoto();

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [".png", ".jpg", ".jpeg"],
      },
      maxFiles: 1,
      multiple: false,
      ...dropzoneOptions,
      onDrop: async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          try {
            setIsUploading(true);
            const [imageInfo, exifData] = await Promise.all([
              getImageInfo(file),
              getPhotoExif(file),
            ]);

            if (imageInfo?.blurhash) {
              setBlurhash(imageInfo.blurhash);
            }

            uploadMutation.mutate({
              file,
              onSuccess: (data) => {
                if (onChange) {
                  onChange({
                    url: data.publicUrl,
                    imageInfo: imageInfo || undefined,
                    exif: exifData || undefined,
                  });
                }
                setIsUploading(false);
              },
            });
          } catch (error) {
            console.error("Upload error:", error);
            setIsUploading(false);
          }
        }
      },
    });

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBlurhash(null);
    if (onChange) {
      onChange({ url: "", imageInfo: undefined, exif: undefined });
    }
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-400 bg-gray-50 text-center hover:bg-gray-50/50",
        isDragActive && "border-blue-500 bg-blue-50/50",
        isDragReject && "border-red-500 bg-red-50/50",
        isUploading && "opacity-50",
        className
      )}
    >
      <input {...getInputProps()} />

      {(isUploading || value) && blurhash ? (
        <div className="relative w-full aspect-[3/2] overflow-hidden rounded-lg group">
          {isUploading ? (
            <>
              <Blurhash
                hash={blurhash}
                width="100%"
                height="100%"
                resolutionX={32}
                resolutionY={32}
                punch={1}
              />
              <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20">
                <Loader2 className="h-10 w-10 text-white animate-spin" />
              </div>
            </>
          ) : value ? (
            <>
              <img
                src={value}
                alt="Preview"
                className="object-cover rounded-lg transition-transform duration-200 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-rose-500 text-white p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-rose-600"
                type="button"
              >
                <Icons.x className="size-4" />
              </button>
            </>
          ) : null}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center">
            <ImageIcon className="h-10 w-10 text-gray-400" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              {isDragActive
                ? "Drop the image here"
                : "Click or drag image to upload"}
            </p>
            <p className="text-xs text-gray-500">PNG, JPG</p>
          </div>
        </div>
      )}
    </div>
  );
}

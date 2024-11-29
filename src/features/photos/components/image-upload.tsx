"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useUploadPhoto } from "../api/use-upload-photo";
import { cn } from "@/lib/utils";
import {
  getPhotoExif,
  type ExifData,
  getImageInfo,
  type ImageInfo,
} from "../utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PhotoFormData } from "../schema/new-photo-schema";
import { toast } from "sonner";
import { BsCameraFill, BsAspectRatio, BsGrid3X3 } from "react-icons/bs";
import { MdCameraswitch, MdPhotoCamera, MdCameraAlt } from "react-icons/md";

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void;
  onChange?: (value: Partial<PhotoFormData>) => void;
  value?: string;
  className?: string;
}

export function ImageUpload({
  onUploadComplete,
  onChange,
  value,
  className,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const uploadPhoto = useUploadPhoto();

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: unknown[]) => {
      if (rejectedFiles.length > 0) {
        toast.error("Only JPG and PNG files are supported");
        return;
      }

      const file = acceptedFiles[0];
      if (!file) return;

      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      try {
        // Extract EXIF data
        const exif = await getPhotoExif(file);
        setExifData(exif);

        // Get image metadata
        const imageInfo = await getImageInfo(file);
        setImageInfo(imageInfo);

        // Upload file
        uploadPhoto.mutate({
          file,
          onSuccess: ({ publicUrl }) => {
            // Update form with all the collected data
            if (onChange) {
              const formData: Partial<PhotoFormData> = {
                url: publicUrl,
                ...(imageInfo && {
                  width: imageInfo.metadata.width,
                  height: imageInfo.metadata.height,
                  aspectRatio: imageInfo.metadata.aspectRatio,
                  blurData: imageInfo.blurhash,
                }),
                ...(exif && {
                  make: exif.make,
                  model: exif.model,
                  lensModel: exif.lensModel,
                  focalLength: exif.focalLength,
                  focalLength35mm: exif.focalLength35mm,
                  fNumber: exif.fNumber,
                  iso: exif.iso,
                  exposureTime: exif.exposureTime,
                  exposureCompensation: exif.exposureCompensation,
                  gapLatitude: exif.gapLatitude,
                  gapLongitude: exif.gapLongitude,
                  gpsAltitude: exif.gpsAltitude,
                  dateTimeOriginal: exif.dateTimeOriginal?.toISOString(),
                }),
              };
              onChange(formData);
            }
            onUploadComplete?.(publicUrl);
          },
        });
      } catch (error) {
        console.error("Error processing image:", error);
      }

      return () => URL.revokeObjectURL(objectUrl);
    },
    [onChange, onUploadComplete, uploadPhoto]
  );

  const clearImage = useCallback(() => {
    setPreview(null);
    setExifData(null);
    if (onChange) {
      const clearedData: Partial<PhotoFormData> = {
        url: "",
        width: undefined,
        height: undefined,
        aspectRatio: undefined,
        blurData: undefined,
        make: undefined,
        model: undefined,
        lensModel: undefined,
        focalLength: undefined,
        focalLength35mm: undefined,
        fNumber: undefined,
        iso: undefined,
        exposureTime: undefined,
        exposureCompensation: undefined,
        gapLatitude: undefined,
        gapLongitude: undefined,
        gpsAltitude: undefined,
        dateTimeOriginal: undefined,
      };
      onChange(clearedData);
    }
    onUploadComplete?.("");
  }, [onChange, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      maxFiles: 1,
      multiple: false,
    });

  return (
    <div className={cn("w-full", className)}>
      {!preview ? (
        <div
          {...getRootProps()}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 aspect-video cursor-pointer transition-colors",
            isDragReject
              ? "border-rose-500 bg-rose-50"
              : isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          )}
        >
          <input {...getInputProps()} />
          <div className="absolute inset-0 pointer-events-none">
            {/* Viewfinder grid */}
            <div className="w-full h-full grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-gray-400/20" />
              ))}
            </div>

            {/* Camera UI elements */}
            <div className="absolute top-4 left-4 flex items-center space-x-2 text-gray-600">
              <BsCameraFill className="w-5 h-5" />
              <span className="text-sm font-mono">REC</span>
            </div>

            <div className="absolute top-4 right-4 flex items-center space-x-2 text-gray-600">
              <BsAspectRatio className="w-4 h-4" />
              <span className="text-sm font-mono">16:9</span>
            </div>

            {/* Bottom info bar */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-gray-600">
              <div className="flex items-center space-x-4">
                <MdCameraAlt className="w-6 h-6" />
                <span className="text-sm font-mono">F4.0</span>
                <span className="text-sm font-mono">ISO 2500</span>
              </div>
              <div className="flex items-center space-x-2">
                <BsGrid3X3 className="w-4 h-4" />
                <MdCameraswitch className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <MdPhotoCamera className="w-12 h-12 mb-4 text-gray-400" />
            <p className="text-gray-600">
              {isDragReject
                ? "Unsupported file format"
                : isDragActive
                ? "Drop to capture"
                : "Click or drag image to capture"}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative aspect-video w-full bg-black group">
          <div className="relative h-full w-full">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
            />
            {/* Viewfinder overlay */}
            <div className="absolute inset-0">
              {/* Viewfinder grid */}
              <div className="pointer-events-none w-full h-full grid grid-cols-3 grid-rows-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="border border-white/20" />
                ))}
              </div>

              {/* Camera UI elements */}
              <div className="pointer-events-none absolute top-4 left-4 flex items-center space-x-2 text-white/80">
                <BsCameraFill className="w-5 h-5" />
                <span className="text-sm font-mono">PREVIEW</span>
              </div>

              <div className="pointer-events-none absolute top-4 right-4 flex items-center space-x-2 text-white/80">
                <BsAspectRatio className="w-4 h-4" />
                <span className="text-sm font-mono">
                  {imageInfo?.metadata.aspectRatio || "16:9"}
                </span>
              </div>

              {/* Bottom info bar */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white/80">
                <div className="pointer-events-none flex items-center space-x-4">
                  <MdCameraAlt className="w-6 h-6" />
                  {exifData && (
                    <>
                      <span className="text-sm font-mono">
                        f/{exifData.fNumber?.toFixed(1)}
                      </span>
                      <span className="text-sm font-mono">
                        {exifData.focalLength}mm
                      </span>
                      <span className="text-sm font-mono">
                        ISO {exifData.iso}
                      </span>
                      {exifData.exposureTime && (
                        <span className="text-sm font-mono">
                          1/{Math.round(1 / exifData.exposureTime)}s
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <BsGrid3X3 className="w-4 h-4 pointer-events-none" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:text-white/80 hover:bg-white/10"
                    onClick={clearImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

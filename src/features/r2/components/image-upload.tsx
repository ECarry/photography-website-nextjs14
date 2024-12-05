"use client";

// External dependencies
import Image from "next/image";
import { useCallback, useState } from "react";
import { cn, formatExposureTime } from "@/lib/utils";
import {
  getPhotoExif,
  type ExifData,
  getImageInfo,
  type ImageInfo,
} from "../../photos/utils";

// Internal dependencies - UI Components
import { toast } from "sonner";
import { X } from "lucide-react";
import { Blurhash } from "react-blurhash";
import { useDropzone } from "react-dropzone";
import { MdPhotoCamera, MdCenterFocusStrong } from "react-icons/md";
import { Progress } from "@/components/ui/progress";
import {
  PiBatteryHigh,
  PiPlusMinusFill,
  PiUserFocusDuotone,
} from "react-icons/pi";

// Internal dependencies - Hooks & Store
import { useUploadPhoto } from "../api/use-upload-photo";
import { useDeletePhoto } from "../api/use-delete-photo";

interface ImageUploadProps {
  onChange?: (data: {
    url: string;
    exif: ExifData | null;
    imageInfo: ImageInfo;
  }) => void;
  value?: string;
  className?: string;
}

export function ImageUpload({ onChange, value, className }: ImageUploadProps) {
  const [url, setUrl] = useState(value || "");
  const [isLoaded, setIsLoaded] = useState(false);
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [imageInfo, setImageInfo] = useState<ImageInfo>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const uploadPhoto = useUploadPhoto();
  const removePhoto = useDeletePhoto();

  // 重置组件状态
  const resetState = useCallback(() => {
    setUrl("");
    setIsLoaded(false);
    setExifData(null);
    setImageInfo(undefined);
    const filename = url.split("/").pop();

    if (!filename) {
      toast.error("Filename not uploaded.");
      return;
    }

    removePhoto.mutate({
      filename,
    });
  }, [removePhoto, url]);

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: unknown[]) => {
      if (rejectedFiles.length > 0) {
        toast.error("Only JPG and PNG files are supported");
        return;
      }

      const file = acceptedFiles[0];
      if (!file) return;

      try {
        const [exif, imageInfo] = await Promise.all([
          getPhotoExif(file),
          getImageInfo(file),
        ]);

        setExifData(exif);
        setImageInfo(imageInfo);
        setIsLoaded(false);

        // Upload file
        uploadPhoto.mutate({
          file,
          onProgress: (progress) => {
            setUploadProgress(progress);
          },
          onSuccess: ({ publicUrl }) => {
            setUrl(publicUrl);
            onChange?.({ url: publicUrl, exif, imageInfo });
          },
        });
      } catch (error) {
        console.error("Error processing image:", error);
        resetState();
      }
    },
    [uploadPhoto, onChange, resetState]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
      maxFiles: 1,
      multiple: false,
    });

  // 渲染上传区域或预览区域
  const renderContent = () => {
    if (!imageInfo?.blurhash) {
      return (
        <div
          {...getRootProps()}
          className={cn(
            "relative border-2 border-dashed rounded-lg aspect-video cursor-pointer transition-colors",
            isDragReject
              ? "border-rose-500 bg-rose-50"
              : isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          )}
        >
          <input {...getInputProps()} />
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-gray-400/20" />
              ))}
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
      );
    }

    return (
      <div className="relative aspect-video w-full bg-black group">
        <div className="relative h-full w-full">
          {/* PROCESS BAR  */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-20">
                <Progress value={uploadProgress} className="h-2 bg-white" />
                <div className="text-center text-sm text-white mt-1">
                  {Math.round(uploadProgress)}%
                </div>
              </div>
            </div>
          )}

          {!isLoaded && (
            <Blurhash
              hash={imageInfo.blurhash}
              width="100%"
              height="100%"
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          )}
          {url && (
            <Image
              src={url}
              alt="Preview"
              fill
              sizes="(max-width: 640px) 100vw, 
                     (max-width: 1080px) 75vw,
                     (max-width: 1200px) 50vw,
                     33vw"
              quality={85}
              priority={true}
              loading="eager"
              className={cn(
                "object-contain",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoadingComplete={() => setIsLoaded(true)}
            />
          )}
          {/* Viewfinder overlay */}
          <div className="absolute inset-0">
            {/* Viewfinder grid */}
            <div className="pointer-events-none w-full h-full grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-white/20" />
              ))}
            </div>

            {/* Camera UI elements */}
            <div className="absolute top-4 left-4 text-white">
              <span className="text-4xl font-mono">A</span>
            </div>

            <div className="absolute top-2 right-4 flex items-center text-white">
              <PiBatteryHigh className="size-6 rotate-180" />
              <span className="text-sm font-mono">89%</span>
            </div>

            <div className="absolute left-2 bottom-32 flex items-center">
              <div className="block text-black px-1 bg-white font-bold">
                AF-A
              </div>
            </div>

            <div className="absolute top-16 right-2 flex items-center text-white">
              <MdCenterFocusStrong className="size-8" />
            </div>

            <div className="absolute left-2 bottom-8 flex items-center text-white">
              <PiUserFocusDuotone className="size-8" />
              <div className="flex flex-col text-sm">
                <span>AF</span>
                <span>ON</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom info bar */}
        <div className="relative bg-black bottom-0 left-0 right-0 h-10 text-white flex items-center justify-center gap-12">
          <span>
            {exifData?.exposureTime
              ? formatExposureTime(exifData?.exposureTime)
              : "1/100"}
          </span>
          <span>{exifData?.fNumber ? "ƒ " + exifData?.fNumber : "ƒ 4"}</span>
          <div className="flex items-center gap-[2px]">
            <PiPlusMinusFill size={20} />
            <span>
              {exifData?.exposureCompensation
                ? "± " + exifData?.exposureCompensation
                : "± 0.0"}
            </span>
          </div>
          <span>{exifData?.iso ? "ISO " + exifData?.iso : "ISO 100"}</span>
        </div>

        <div
          onClick={resetState}
          className="absolute bg-red-500 rounded-full size-6 flex items-center justify-center -top-2 -right-2 cursor-pointer"
        >
          <X className="size-4 text-white" />
        </div>
      </div>
    );
  };

  return <div className={cn("w-full", className)}>{renderContent()}</div>;
}

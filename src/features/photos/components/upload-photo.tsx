/* eslint-disable @next/next/no-img-element */
"use client";

import { ChangeEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUploadPhoto } from "../api/use-upload-photo";
import {
  formatFocalLength,
  formatFNumber,
  formatISO,
  formatExposureCompensation,
  formatGPSCoordinates,
  formatGPSAltitude,
  formatDateTime,
  formatExposureTime,
  formatFocalLength35mm,
} from "@/lib/utils";
import {
  getImageInfo,
  getPhotoExif,
  type ExifData,
  type ImageInfo,
} from "../utils";
import { Blurhash } from "react-blurhash";

export const UploadPhoto = () => {
  const [file, setFile] = useState<File | null>(null);
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [blurhash, setBlurhash] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<ImageInfo["metadata"] | null>(null);

  const [uploadedImage, setUploadedImage] = useState<{
    url: string;
    filename: string;
  } | null>(null);

  const uploadMutation = useUploadPhoto();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setUploadedImage(null);
    const file = event.target.files?.[0];
    if (!file) return;

    setFile(file);
    const exif = await getPhotoExif(file);
    const imageInfo = await getImageInfo(file);

    if (imageInfo) {
      const { metadata, blurhash } = imageInfo;
      console.log("Metadata:", metadata);
      console.log("Blurhash:", blurhash);
      setMetadata(metadata);
      setBlurhash(blurhash);
    }

    console.log("EXIF Data:", exif);
    setExifData(exif);
  };

  const handleUpload = async () => {
    if (!file) return;

    uploadMutation.mutate({
      file,
      onSuccess: (data) => {
        setUploadedImage({
          url: data.publicUrl,
          filename: data.filename,
        });
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={false}
          className="cursor-pointer"
        />
        <Button
          onClick={handleUpload}
          disabled={!file || uploadMutation.isPending}
          className="w-full text-white"
        >
          {uploadMutation.isPending ? "Uploading..." : "Upload"}
        </Button>
      </div>

      {/* EXIF 信息显示 */}
      {exifData && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Photo Information</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 text-sm">
            {exifData.make && exifData.model && (
              <div>
                <span className="font-medium">Camera:</span> {exifData.make}{" "}
                {exifData.model}
              </div>
            )}
            {exifData.lensModel && (
              <div>
                <span className="font-medium">Lens:</span> {exifData.lensModel}
              </div>
            )}
            {exifData.focalLength && (
              <div>
                <span className="font-medium">Focal Length:</span>{" "}
                {formatFocalLength(exifData.focalLength)}
                {exifData.focalLength35mm &&
                  ` (${formatFocalLength35mm(exifData.focalLength35mm)})`}
              </div>
            )}
            {exifData.fNumber && (
              <div>
                <span className="font-medium">Aperture:</span>{" "}
                {formatFNumber(exifData.fNumber)}
              </div>
            )}
            {exifData.exposureTime && (
              <div>
                <span className="font-medium">Shutter Speed:</span>{" "}
                {formatExposureTime(exifData.exposureTime)}
              </div>
            )}
            {exifData.iso && (
              <div>
                <span className="font-medium">ISO:</span>{" "}
                {formatISO(exifData.iso)}
              </div>
            )}
            {typeof exifData.exposureCompensation === "number" && (
              <div>
                <span className="font-medium">Exposure Compensation:</span>{" "}
                {formatExposureCompensation(exifData.exposureCompensation)}
              </div>
            )}
            {(exifData.gapLatitude || exifData.gapLongitude) && (
              <div>
                <span className="font-medium">Location:</span>{" "}
                {formatGPSCoordinates(
                  exifData.gapLatitude,
                  exifData.gapLongitude
                )}
              </div>
            )}
            {exifData.gpsAltitude && (
              <div>
                <span className="font-medium">Altitude:</span>{" "}
                {formatGPSAltitude(exifData.gpsAltitude)}
              </div>
            )}
            {exifData.dateTimeOriginal && (
              <div>
                <span className="font-medium">Date Taken:</span>{" "}
                {formatDateTime(exifData.dateTimeOriginal)}
              </div>
            )}

            {metadata && (
              <div>
                <span>
                  Size: {metadata.width} x {metadata.height}
                </span>
              </div>
            )}

            {metadata && (
              <div>
                <span>AspectRatio: {metadata.aspectRatio}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {blurhash && (
        <div className="mt-4">
          {uploadedImage ? (
            <img
              src={uploadedImage.url}
              alt={uploadedImage.filename}
              className="max-w-full h-auto rounded-lg"
            />
          ) : (
            <Blurhash
              hash={blurhash}
              width={400}
              height={300}
              resolutionX={64}
              resolutionY={64}
              punch={1}
            />
          )}
        </div>
      )}
    </div>
  );
};

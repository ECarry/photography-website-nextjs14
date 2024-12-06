import { ExifParserFactory } from "ts-exif-parser";
import { encode } from "blurhash";

export interface ExifData {
  make?: string;
  model?: string;
  lensModel?: string;
  focalLength?: number;
  focalLength35mm?: number;
  fNumber?: number;
  iso?: number;
  exposureTime?: number;
  exposureCompensation?: number;
  latitude?: number;
  longitude?: number;
  gpsAltitude?: number;
  dateTimeOriginal?: Date;
}

export interface ImageInfo {
  width: number;
  height: number;
  aspectRatio: number;
  blurhash: string;
}

const loadImage = async (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Extract EXIF data from photo file
 * @param file Photo file
 * @returns EXIF data
 */
export const getPhotoExif = async (file: File): Promise<ExifData | null> => {
  try {
    const buffer = await file.arrayBuffer();
    const parser = ExifParserFactory.create(Buffer.from(buffer));
    const result = parser.parse();

    if (!result || !result.tags) {
      return null;
    }

    const {
      Make,
      Model,
      LensModel,
      FocalLength,
      FocalLengthIn35mmFormat,
      FNumber,
      ISO,
      ExposureTime,
      ExposureCompensation,
      GPSLatitude,
      GPSLongitude,
      GPSAltitude,
      DateTimeOriginal,
    } = result.tags;

    // Type cast and validation
    const exifData: ExifData = {
      make: Make as string | undefined,
      model: Model as string | undefined,
      lensModel: LensModel as string | undefined,
      focalLength: typeof FocalLength === "number" ? FocalLength : undefined,
      focalLength35mm:
        typeof FocalLengthIn35mmFormat === "number"
          ? FocalLengthIn35mmFormat
          : undefined,
      fNumber: typeof FNumber === "number" ? FNumber : undefined,
      iso: typeof ISO === "number" ? ISO : undefined,
      exposureTime: typeof ExposureTime === "number" ? ExposureTime : undefined,
      exposureCompensation:
        typeof ExposureCompensation === "number"
          ? ExposureCompensation
          : undefined,
      latitude: typeof GPSLatitude === "number" ? GPSLatitude : undefined,
      longitude: typeof GPSLongitude === "number" ? GPSLongitude : undefined,
      gpsAltitude: typeof GPSAltitude === "number" ? GPSAltitude : undefined,
      dateTimeOriginal: DateTimeOriginal
        ? new Date(DateTimeOriginal * 1000)
        : undefined,
    };

    return exifData;
  } catch (error) {
    console.error("Error reading EXIF data:", error);
    return null;
  }
};

/**
 * Extract image metadata and blurhash from photo file
 * @param file Photo file
 * @returns Image metadata and blurhash
 */
export const getImageInfo = async (file: File): Promise<ImageInfo> => {
  if (!file) {
    throw new Error("No file provided");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Invalid file type. Only images are allowed");
  }

  try {
    const img = await loadImage(file);
    // generate blurhash
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    ctx.drawImage(img, 0, 0, 32, 32);
    const imageData = ctx.getImageData(0, 0, 32, 32);

    const blurhash = encode(
      imageData.data,
      imageData.width,
      imageData.height,
      5,
      4
    );

    if (!blurhash) {
      throw new Error("Failed to generate blurhash");
    }

    const imageInfo: ImageInfo = {
      width: img.width,
      height: img.height,
      aspectRatio: Number((img.width / img.height).toFixed(2)),
      blurhash,
    };

    // cleanup
    URL.revokeObjectURL(img.src);

    return imageInfo;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to process image: " + String(error));
  }
};

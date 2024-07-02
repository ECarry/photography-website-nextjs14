import { ExifData } from "ts-exif-parser";
import { fromUnixTime, format } from "date-fns";

function formatTimestamp(timestamp: number): string {
  // 将时间戳转换为 Date 对象
  return fromUnixTime(timestamp).toISOString();
}

// make: varchar("make", { length: 255 }),
// model: varchar("model", { length: 255 }),
// lensModel: varchar("lens_model", { length: 255 }),
// focalLength: smallint("focal_length"),
// focalLength35mm: smallint("focal_length_35mm"),
// fNumber: real("f_number"),
// iso: smallint("iso"),
// exposureTime: real("exposure_time"),
// exposureCompensation: real("exposure_compensation"),
// locationName: varchar("location_name", { length: 255 }),
// latitude: real("latitude"),
// longitude: real("longitude"),
// gpsAltitude: real("gps_altitude"),
// takeAt: timestamp("take_at"),
export const formatExif = (exif?: ExifData) => {
  if (!exif?.tags) return null;

  const gps = convertGPSToDecimal({
    GPSLatitude: exif.tags.GPSLatitude,
    GPSLatitudeRef: exif.tags.GPSLatitudeRef,
    GPSLongitude: exif.tags.GPSLongitude,
    GPSLongitudeRef: exif.tags.GPSLongitudeRef,
  });

  const data = {
    make: exif.tags.Make,
    model: exif.tags.Model,
    lensModel: exif.tags.LensModel,
    focalLength: exif.tags.FocalLength,
    focalLength35mm: exif.tags.FocalLengthIn35mmFormat?.toString(),
    fNumber: exif.tags.FNumber,
    iso: exif.tags.ISO,
    exposureTime: exif.tags.ExposureTime,
    exposureCompensation: exif.tags.ExposureCompensation?.toString(),
    gpsAltitude: exif.tags.GPSAltitude,
    takeAt: exif.tags.DateTimeOriginal
      ? formatTimestamp(exif.tags.DateTimeOriginal)
      : undefined,
    ...gps,
  };

  return data;
};

interface GPSData {
  GPSLatitude?: number;
  GPSLatitudeRef?: string;
  GPSLongitude?: number;
  GPSLongitudeRef?: string;
}

function isValidLatitudeRef(ref: string | undefined): ref is "N" | "S" {
  return ref === "N" || ref === "S";
}

function isValidLongitudeRef(ref: string | undefined): ref is "E" | "W" {
  return ref === "E" || ref === "W";
}

function convertGPSToDecimal(gpsData: GPSData): {
  latitude: number;
  longitude: number;
} | null {
  const { GPSLatitude, GPSLatitudeRef, GPSLongitude, GPSLongitudeRef } =
    gpsData;

  if (
    typeof GPSLatitude !== "number" ||
    !isValidLatitudeRef(GPSLatitudeRef) ||
    typeof GPSLongitude !== "number" ||
    !isValidLongitudeRef(GPSLongitudeRef)
  ) {
    return null;
  }

  let latitude = GPSLatitude;
  if (GPSLatitudeRef === "S") {
    latitude = -latitude;
  }

  let longitude = GPSLongitude;
  if (GPSLongitudeRef === "W") {
    longitude = -longitude;
  }

  return {
    latitude,
    longitude,
  };
}

export const formatExposureTime = (exposureTime = 0) =>
  exposureTime > 0
    ? exposureTime < 1
      ? `1/${Math.round(1 / exposureTime)}s`
      : `${exposureTime}s`
    : undefined;

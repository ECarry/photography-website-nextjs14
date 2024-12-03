import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format exposure time to string (e.g., "1/1000")
 * @example formatExposureTime(1) => "1/1000"
 */
export const formatExposureTime = (exposureTime?: number): string => {
  if (!exposureTime) return "";
  return exposureTime < 1
    ? `1/${Math.round(1 / exposureTime)}`
    : exposureTime.toString();
};

/**
 * Format exposure compensation to string (e.g., "+1 EV", "0 EV", or "-1 EV")
 * @example formatExposureCompensation(1) => "+1 EV"
 */
export const formatExposureCompensation = (
  exposureCompensation?: number
): string => {
  if (typeof exposureCompensation !== "number") return "";
  if (exposureCompensation === 0) return "0 EV";
  return `${exposureCompensation > 0 ? "+" : ""}${exposureCompensation} EV`;
};

/**
 * Format focal length with unit
 * @example formatFocalLength(50) => "50mm"
 */
export const formatFocalLength = (focalLength?: number): string => {
  if (!focalLength) return "";
  return `${focalLength}mm`;
};

/**
 * Format focal length 35mm equivalent
 * @example formatFocalLength35mm(50) => "50mm in 35mm"
 */
export const formatFocalLength35mm = (focalLength35mm?: number): string => {
  if (!focalLength35mm) return "";
  return `${focalLength35mm}mm in 35mm`;
};

/**
 * Format f-number with f/ prefix
 * @example formatFNumber(1.8) => "f/1.8"
 * @example formatFNumber(2.0) => "f/2"
 */
export const formatFNumber = (fNumber?: number): string => {
  if (!fNumber) return "";

  if (Number.isInteger(fNumber) || fNumber % 1 === 0) {
    return `f/${Math.round(fNumber)}`;
  }

  return `f/${fNumber.toFixed(1)}`;
};

/**
 * Format ISO with prefix
 * @example formatISO(100) => "ISO 100"
 */
export const formatISO = (iso?: number): string => {
  if (!iso) return "";
  return `ISO ${iso}`;
};

/**
 * Format GPS coordinates to decimal degrees
 * @example formatGPSCoordinates(40.7128, -74.006) => "40.7128°N, 74.006°W"
 */
export const formatGPSCoordinates = (
  latitude?: number,
  longitude?: number
): string => {
  if (!longitude || !latitude) return "- -";

  const eastWest = longitude >= 0 ? "E" : "W";
  const northSouth = latitude >= 0 ? "N" : "S";

  const eastWestCoord = `${Math.abs(longitude).toFixed(4)} ${eastWest}`;
  const northSouthCoord = `${Math.abs(latitude).toFixed(4)} ${northSouth}`;

  return `${eastWestCoord}, ${northSouthCoord}`;
};

/**
 * Format GPS altitude
 * @example formatGPSAltitude(100.5) => "100.5m"
 */
export const formatGPSAltitude = (altitude?: number) => {
  if (!altitude) return "";
  return `${altitude.toFixed(1)}m`;
};

/**
 * Format date time with detailed format
 * The camera has timezone settings, directly convert timestamp to date
 * The time defaults to the timezone set by the camera
 * @example formatDateTime(new Date()) => "2024-01-01 12:00:00"
 */
export const formatDateTime = (date?: Date) => {
  if (!date) return "";

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

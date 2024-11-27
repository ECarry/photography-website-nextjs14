import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format exposure time to string (e.g., "1/1000")
 */
export const formatExposureTime = (exposureTime?: number): string => {
  if (!exposureTime) return "";
  return exposureTime < 1
    ? `1/${Math.round(1 / exposureTime)}`
    : exposureTime.toString();
};

/**
 * Format exposure compensation to string (e.g., "+1 EV", "0 EV", or "-1 EV")
 */
export const formatExposureCompensation = (
  exposureCompensation?: number
): string => {
  if (typeof exposureCompensation !== "number") return "";
  // 对于 0 值，显示 "0 EV"
  if (exposureCompensation === 0) return "0 EV";
  return `${exposureCompensation > 0 ? "+" : ""}${exposureCompensation} EV`;
};

/**
 * Format focal length with unit
 */
export const formatFocalLength = (focalLength?: number): string => {
  if (!focalLength) return "";
  return `${focalLength}mm`;
};

/**
 * Format focal length 35mm equivalent
 */
export const formatFocalLength35mm = (focalLength35mm?: number): string => {
  if (!focalLength35mm) return "";
  return `${focalLength35mm}mm in 35mm`;
};

/**
 * Format f-number with f/ prefix
 */
export const formatFNumber = (fNumber?: number): string => {
  if (!fNumber) return "";
  return `f/${fNumber}`;
};

/**
 * Format ISO with prefix
 */
export const formatISO = (iso?: number): string => {
  if (!iso) return "";
  return `ISO ${iso}`;
};

/**
 * Format GPS coordinates to decimal degrees
 */
export const formatGPSCoordinates = (
  latitude?: number,
  longitude?: number
): string => {
  if (!latitude || !longitude) return "";
  return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
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
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

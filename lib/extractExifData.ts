interface ExifRawData {
  Make?: string;
  Model?: string;
  XResolution?: number;
  YResolution?: number;
  ResolutionUnit?: string;
  Software?: string;
  ModifyDate?: string;
  Artist?: string;
  Copyright?: string;
  ExposureTime?: number;
  FNumber?: number;
  ExposureProgram?: string;
  ISO?: number;
  SensitivityType?: number;
  RecommendedExposureIndex?: number;
  ExifVersion?: string;
  DateTimeOriginal?: string;
  CreateDate?: string;
  OffsetTime?: string;
  ShutterSpeedValue?: number;
  ApertureValue?: number;
  BrightnessValue?: number;
  ExposureCompensation?: number;
  MaxApertureValue?: number;
  MeteringMode?: string;
  LightSource?: string;
  Flash?: string;
  FocalLength?: number;
  ColorSpace?: number;
  FocalPlaneXResolution?: number;
  FocalPlaneYResolution?: number;
  FocalPlaneResolutionUnit?: string;
  FileSource?: string;
  SceneType?: string;
  CustomRendered?: string;
  ExposureMode?: string;
  WhiteBalance?: string;
  DigitalZoomRatio?: number;
  FocalLengthIn35mmFormat?: number;
  SceneCaptureType?: string;
  Contrast?: string;
  Saturation?: string;
  Sharpness?: string;
  SerialNumber?: string;
  LensInfo?: number[];
  LensModel?: string;
  GPSVersionID?: string;
  GPSLatitudeRef?: string;
  GPSLatitude?: number[];
  GPSLongitudeRef?: string;
  GPSLongitude?: number[];
  GPSAltitudeRef?: object;
  GPSAltitude?: string;
  latitude?: number;
  longitude?: number;
}

// 定义一个函数，用于从 exif 原始数据中提取所需的数据，并按照给定的格式返回一个对象
export default function extractExifData(exifRawData: ExifRawData) {
  // 从 exifRawData 中获取所需的数据，如果没有则设为 null
  const cameraMake = exifRawData.Make ?? null;
  const cameraModel = exifRawData.Model ?? null;
  const cameraLens = exifRawData.LensModel ?? null;
  const timestamp = exifRawData.DateTimeOriginal?.toString() ?? null;

  const gpsAltitude = exifRawData.GPSAltitude + "m";
  const shutterSpeed = exifRawData.ExposureTime?.toString() ?? null;
  const fNumber = exifRawData.FNumber ? `ƒ + ${exifRawData.FNumber}` : null;
  const focalLengthIn35mmFilm = exifRawData.FocalLengthIn35mmFormat
    ? `ƒ + ${exifRawData.FocalLengthIn35mmFormat}`
    : null;
  const iso = exifRawData.ISO?.toString() ?? null;
  const focalLength = exifRawData.FocalLength?.toString() ?? null;

  // 按照给定的格式返回一个对象
  return {
    cameraMake: cameraMake,
    cameraModel: cameraModel,
    cameraLens: cameraLens,
    timestamp: timestamp,
    latitude: exifRawData.latitude,
    longitude: exifRawData.longitude,
    gpsAltitude: gpsAltitude,
    shutterSpeed: shutterSpeed,
    fNumber: fNumber,
    focalLengthIn35mmFilm: focalLengthIn35mmFilm,
    iso: iso,
    focalLength: focalLength,
  };
}

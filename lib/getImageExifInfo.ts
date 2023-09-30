import EXIF from 'exif-js';
import parseGPSCoordinate from './parseGPSCoordinate';

const readExifData = (blob: Blob): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      const exifData = EXIF.readFromBinaryFile(arrayBuffer);

      const cameraMake = exifData.Make || null;
      const cameraModel = exifData.Model || null;
      const cameraLens = exifData.undefined || null;
      const timestamp = exifData.DateTimeOriginal || null;

      const latitude = () => {
        if (!exifData.GPSLatitude) return null;

        const lat = {
          ref: exifData.GPSLatitudeRef,
          values: exifData.GPSLatitude,
        };

        const data = parseGPSCoordinate(lat)

        return String(data)
      }

      const longitude = () => {
        if (!exifData.GPSLatitude) return null;

        const lon = {
          ref: exifData.GPSLongitudeRef,
          values: exifData.GPSLongitude,
        };

        const data = parseGPSCoordinate(lon)

        return String(data)
      }

      const gpsAltitude = () => {
        if (!exifData.GPSAltitude) return null;

        const data = exifData.GPSAltitude.numerator / exifData.GPSAltitude.denominator

        return `Altitude ${data}m`
      }

      const iso = () => {
        if (!exifData.ISOSpeedRatings) return null;

        return `ISO ${exifData.ISOSpeedRatings}`
      }
      
      const shutterSpeed = () => {
        if (!exifData.ExposureTime) return null;

        return exifData.ExposureTime.denominator === 1 
                ? `${exifData.ExposureTime.numerator}s`
                : exifData.ExposureTime.numerator+ '/' + exifData.ExposureTime.denominator
      }
    
      const focalLengthIn35mmFilm = () => {
        if (!exifData.FocalLengthIn35mmFilm) return null;

        return `${exifData.FocalLengthIn35mmFilm}mm`
      }

      const focalLength = () => {
        if (!exifData.FocalLength) return null;

        return `${exifData.FocalLength}mm`
      }

      const fNumber = () => {
        if (!exifData.FNumber) return null;

        const data = exifData.FNumber.denominator === 1 
                ? exifData.FNumber.numerator 
                : exifData.FNumber.numerator / exifData.FNumber.denominator

        return `ƒ/${data}`
      }

      const exif = {
        'cameraMake': cameraMake,
        'cameraModel': cameraModel,
        'cameraLens': cameraLens,
        'timestamp': timestamp,
        'latitude': latitude(),
        'longitude': longitude(),
        'gpsAltitude': gpsAltitude(),
        'shutterSpeed': shutterSpeed(),
        'fNumber': fNumber(),
        'focalLengthIn35mmFilm': focalLengthIn35mmFilm(),
        'iso': iso(),
        'focalLength': focalLength()
      }
      resolve(exif);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(blob);
  });
};

const getImageAspectRatioFromBlob = (blob: Blob): Promise<{ aspectRatio: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(blob);

    img.onload = () => {
      const aspectRatio = img.width / img.height
      resolve({aspectRatio});
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
};

const getImageExifInfo = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl, { method: 'GET' });

    if (!response.ok) {
      throw new Error('获取图片失败');
    }

    const blob = await response.blob();

    const aspectRatio = await getImageAspectRatioFromBlob(blob);
    const exifData = await readExifData(blob);
    
    const data = {
      ...aspectRatio,
      ...exifData
    }
    return data
  } catch (error) {
    console.error('获取图片并解析 EXIF 信息出错：', error);
  }
};

export default getImageExifInfo;

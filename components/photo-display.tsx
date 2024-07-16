import Image from "next/image";
import { FC } from "react";

interface ExifData {
  camera: string;
  focalLength: string;
  aperture: string;
  exposureTime: string;
  iso: string;
}

interface Props {
  src: string;
  blurDataUrl: string;
  exif: ExifData;
}

const PhotoDisplay: FC<Props> = ({ src, blurDataUrl, exif }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      <div className="absolute inset-0">
        <Image
          src={blurDataUrl}
          alt="Blurred background"
          layout="fill"
          objectFit="cover"
          className="filter blur-lg scale-125"
        />
      </div>
      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-xl">
          <Image
            src={src}
            alt="Main photo"
            layout="responsive"
            width={500}
            height={750}
            className="rounded-xl"
          />
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center bg-black bg-opacity-50 rounded-lg px-4 py-2">
          <div className="text-lg font-semibold">{exif.camera}</div>
          <div className="text-sm">
            {exif.focalLength} {exif.aperture} {exif.exposureTime} {exif.iso}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDisplay;

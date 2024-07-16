"use client";

import Image from "next/image";
import { useGetPhoto } from "@/features/photos/api/use-get-photo";
import { Loader2 } from "lucide-react";
import { formatExposureTime } from "@/lib/format-exif";
import { useState } from "react";
import BrandLogo from "@/components/brand-logo";

interface PhotoPageProps {
  params: {
    id: string;
  };
}

const PhotoPage = ({ params }: PhotoPageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const photoQuery = useGetPhoto(params.id);

  const photo = photoQuery.data;

  if (!photo) {
    return (
      <div className="w-full h-dvh flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <section className="overflow-hidden ml-0 md:ml-[280px] relative flex items-center justify-center h-dvh flex-col gap-4 p-4">
      <Image
        src={photo?.url}
        alt={photo.title}
        width={photo.width}
        height={photo.height}
        placeholder="blur"
        blurDataURL={photo.blurData}
        onLoad={() => setIsLoaded(true)}
        className="z-10 w-auto max-h-[900px] shadow-2xl shadow-black rounded-xl"
      />
      {isLoaded && (
        <div className="z-50 flex flex-col items-center select-none">
          <BrandLogo brandName={photo.make} />
          <div className="text-white space-x-[6px]">
            <span>{photo.focalLength35mm + "mm"}</span>
            <span>{"ƒ/" + photo.fNumber}</span>
            <span>{formatExposureTime(photo.exposureTime ?? 0)}</span>
            <span>{"ISO" + photo.iso}</span>
          </div>
          <p></p>
        </div>
      )}
      <div className="blur-3xl md:left-[280px] fixed inset-0">
        <Image
          src={photo?.url}
          alt={photo.title}
          placeholder="blur"
          blurDataURL={photo.blurData}
          fill
          className="max-h-dvh w-auto object-contain"
        />
      </div>
    </section>
  );
};

export default PhotoPage;

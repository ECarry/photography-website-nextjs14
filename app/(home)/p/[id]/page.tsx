"use client";

import Image from "next/image";
import { useGetPhoto } from "@/features/photos/api/use-get-photo";
import { formatExposureTime } from "@/lib/format-exif";
import { useState } from "react";
import BrandLogo from "@/components/brand-logo";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/date";
import { Separator } from "@/components/ui/separator";
import { convertToCoordination } from "@/lib/convert-coordination";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { usePhotoId } from "@/hooks/use-photo-id";

const PhotoPage = () => {
  const photoId = usePhotoId();
  const [isLoaded, setIsLoaded] = useState(false);
  const photoQuery = useGetPhoto(photoId);

  const photo = photoQuery.data;

  if (!photo) {
    return (
      <div className="w-full h-dvh flex items-center justify-center">
        <Icons.loader className="animate-spin" />
      </div>
    );
  }

  return (
    <section className="overflow-hidden ml-0 md:ml-[280px] relative flex items-center justify-center h-dvh flex-col p-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }} // 动画持续时间为1秒
        className="z-10 relative shadow-2xl shadow-black p-4 md:p-6 pb-0 md:pb-0 bg-white"
      >
        <Image
          src={photo?.url}
          alt={photo.title}
          width={photo.width}
          height={photo.height}
          placeholder="blur"
          blurDataURL={photo.blurData}
          onLoad={() => setIsLoaded(true)}
          className="z-10 w-auto max-h-[80dvh]"
        />
        {isLoaded && (
          <div className="z-50 flex justify-between items-center select-none h-14 md:h-20 bg-white w-full">
            <div className="flex flex-col text-center">
              <h1
                className={cn(
                  "font-semibold text-xs sm:text-sm lg:text-lg",
                  photo.aspectRatio < 1 ? "lg:text-sm" : "lg:text-lg"
                )}
              >
                {photo.make} {photo.model}
              </h1>
              <p className="text-xs text-muted-foreground">
                {photo.lensModel
                  ? photo.lensModel
                  : convertToCoordination(photo.longitude, photo.latitude)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <BrandLogo
                brandName={photo.make}
                small={photo.aspectRatio < 1 ? true : false}
              />
              <Separator
                orientation="vertical"
                className="hidden sm:block h-10"
              />
              <div className="hidden sm:flex flex-col gap-[2px]">
                <div className="space-x-[6px] text-xs lg:md:text-sm">
                  <span>{photo.focalLength35mm + "mm"}</span>
                  <span>{"ƒ/" + photo.fNumber}</span>
                  <span>{formatExposureTime(photo.exposureTime ?? 0)}</span>
                  <span>{"ISO" + photo.iso}</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(photo.takeAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <div className="md:left-[280px] fixed inset-0 blur-lg">
        <Image src={photo.blurData} alt={`${photo.title} blur`} fill />
      </div>
    </section>
  );
};

export default PhotoPage;

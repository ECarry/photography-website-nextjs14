"use client";

import Image from "next/image";
import { useState } from "react";
import Carousel from "./Carousel";
import { cn } from "@/lib/utils";
import { Blurhash } from "react-blurhash";
import { useGetPhotos } from "@/features/photos/api/use-get-photos";

export function ImageSlider() {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const { data: photos, isLoading, error } = useGetPhotos();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading photos</div>;
  }

  if (!photos || photos.length === 0) {
    return <div>No photos available</div>;
  }

  const handleImageLoad = (photoId: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [photoId]: true,
    }));
  };

  return (
    <Carousel
      className="absolute top-0 left-0 w-full h-full rounded-xl"
      containerClassName="h-full"
    >
      {photos.map((photo) => {
        return (
          <div key={photo.id} className="flex-[0_0_100%] h-full relative">
            {!loadedImages[photo.id] && (
              <Blurhash
                hash={photo.blurData}
                width="100%"
                height="100%"
                resolutionX={32}
                resolutionY={32}
                punch={1}
                className="absolute inset-0 z-10"
              />
            )}
            <Image
              src={photo.url}
              alt={photo.title}
              fill
              quality={90}
              priority={photos[0].id === photo.id}
              loading={photos[0].id === photo.id ? "eager" : "lazy"}
              className={cn(
                "object-cover z-20",
                loadedImages[photo.id] ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => handleImageLoad(photo.id)}
              onLoadingComplete={() => handleImageLoad(photo.id)}
            />
          </div>
        );
      })}
    </Carousel>
  );
}

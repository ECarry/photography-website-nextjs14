"use client";

import Image from "next/image";
import Carousel from "./Carousel";
import { useGetPhotos } from "@/features/photos/api/use-get-photos";

export function ImageSlider() {
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

  return (
    <Carousel
      className="absolute top-0 left-0 w-full h-full rounded-xl"
      containerClassName="h-full"
    >
      {photos.map((photo) => (
        <div key={photo.id} className="flex-[0_0_100%] h-full relative">
          <Image
            src={photo.url}
            alt={photo.title}
            fill
            className="object-cover"
            quality={100}
          />
        </div>
      ))}
    </Carousel>
  );
}

"use client";

// UI Components
import Carousel from "./Carousel";
import BlurImage from "./blur-image";
import { memo } from "react";

// HOOKS
import { useGetPhotos } from "@/features/photos/api/use-get-photos";

const ImageSlider = memo(function ImageSlider() {
  const { data: photos } = useGetPhotos();

  if (!photos) {
    return null;
  }

  const favoritePhoto =
    photos.filter((photo) => photo.isFavorite === true) || photos.slice(0, 5);

  return (
    <Carousel
      className="absolute top-0 left-0 w-full h-full rounded-xl"
      containerClassName="h-full"
    >
      {favoritePhoto.map((photo, index) => {
        const shouldPreload = index < 1; // 预加载前两张图片

        return (
          <div key={photo.id} className="flex-[0_0_100%] h-full relative">
            <BlurImage
              src={photo.url}
              alt={photo.title}
              fill
              priority={shouldPreload}
              loading={shouldPreload ? "eager" : "lazy"}
              blurhash={photo.blurData}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}
    </Carousel>
  );
});

export { ImageSlider };

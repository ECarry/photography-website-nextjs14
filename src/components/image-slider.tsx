"use client";

// UI Components
import Carousel from "./Carousel";
import BlurImage from "./blur-image";

// HOOKS
import { useGetPhotos } from "@/features/photos/api/use-get-photos";

export function ImageSlider() {
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
      {favoritePhoto.map((photo) => {
        return (
          <div key={photo.id} className="flex-[0_0_100%] h-full relative">
            <BlurImage
              src={photo.url}
              alt={photo.title}
              fill
              blurhash={photo.blurData}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}
    </Carousel>
  );
}

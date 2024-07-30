"use client";

import AnimateItems from "@/components/AnimateItems";
import { Icons } from "@/components/icons";
import PhotoLarge from "@/components/PhotoLarge";
import { useGetPhotos } from "@/features/photos/api/use-get-photos";

const PhotoList = () => {
  const photosQuery = useGetPhotos();

  const photos = photosQuery.data ?? [];

  return photosQuery.isPending ? (
    <div className="w-full h-dvh flex items-center justify-center">
      <Icons.loader className="animate-spin" />
    </div>
  ) : (
    <div className="space-y-4 p-8 md:ml-[280px] md:p-[50px] md:pl-0">
      <AnimateItems
        className="space-y-8"
        duration={0.7}
        staggerDelay={0.15}
        distanceOffset={0}
        staggerOnFirstLoadOnly
        items={photos.map((photo, index) => (
          <PhotoLarge key={photo.id} photo={photo} priority={index <= 1} />
        ))}
      />
    </div>
  );
};

export default PhotoList;

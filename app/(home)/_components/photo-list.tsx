"use client";

import AnimateItems from "@/components/AnimateItems";
import PhotoLarge from "@/components/PhotoLarge";
import { useGetPhotos } from "@/features/photos/api/use-get-photos";
import { Loader2 } from "lucide-react";

const PhotoList = () => {
  const photoQuery = useGetPhotos();

  const photos = photoQuery.data ?? [];

  return photos.length > 0 ? (
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
  ) : (
    <div className="w-full h-dvh flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default PhotoList;

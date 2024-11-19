"use client";

import { Icons } from "@/components/icons";
import PhotoCard from "../_components/photo-card";
import SortBar from "./sort";
import { useGetPhotos } from "@/features/photos/api/use-get-photos";

const PhotoList = () => {
  const photosQuery = useGetPhotos();

  const photos = photosQuery.data || [];

  return (
    <div className="py-4 space-y-4 px-4">
      <div className="flex items-center">
        <h1 className="hidden md:block text-sm text-muted-foreground font-light tracking-wide subpixel-antialiased">
          Showing <span className="text-black">{photos.length}</span> Photos
          Listing
        </h1>

        <SortBar />
      </div>

      {/* Grid  */}
      {photosQuery.isPending ? (
        <div className="w-full flex items-center justify-center">
          <Icons.loader className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          {photos.map((item) => (
            <PhotoCard key={item.id} photo={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoList;

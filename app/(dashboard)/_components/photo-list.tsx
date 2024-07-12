"use client";

import { Loader2 } from "lucide-react";
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
        <div className="w-full h-dvh flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {photos.map((item) => (
            <PhotoCard key={item.id} photo={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoList;

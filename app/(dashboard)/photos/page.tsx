"use client";

import { useGetPhotos } from "@/features/photos/api/use-get-photos";
import FilterBar from "../_components/filter";

import Mapbox from "../_components/map";
import PhotoList from "../_components/photo-list";
import { MapProvider } from "react-map-gl";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const PhotosPage = () => {
  const photosQuery = useGetPhotos();

  const photos = photosQuery.data || [];

  return (
    <MapProvider>
      <Suspense>
        <main>
          <div className="grid grid-cols-12">
            {/* Left content  */}
            <div className="lg:col-span-7 col-span-12">
              {/* Filter */}
              <div className="flex items-center h-[68px] border-b px-4">
                <FilterBar />
              </div>

              {photosQuery.isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                <PhotoList photos={photos} />
              )}
            </div>

            {/* Right Content  */}
            <div className="col-span-5 sticky top-[61px] w-full max-h-dvh hidden lg:block bg-muted">
              <Mapbox />
            </div>
          </div>
        </main>
      </Suspense>
    </MapProvider>
  );
};

export default PhotosPage;

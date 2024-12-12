"use client";

import Image from "next/image";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Blurhash } from "react-blurhash";
import { MapProvider } from "react-map-gl";
import PhotoList from "../_components/photo-list";
import type { MapboxProps } from "@/components/map";
import { useGetPhotos } from "@/features/photos/api/use-get-photos";

// Lazy load Mapbox component
const MapboxComponent = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-muted">
      <div className="text-muted-foreground">Loading map...</div>
    </div>
  ),
});

const Page = () => {
  const { data: photos } = useGetPhotos();

  const markers: MapboxProps["markers"] =
    photos
      ?.filter(
        (
          photo
        ): photo is typeof photo & { longitude: number; latitude: number } =>
          photo.longitude !== null && photo.latitude !== null
      )
      .map((photo) => ({
        id: photo.id,
        longitude: photo.longitude,
        latitude: photo.latitude,
        element: (
          <div className="relative group cursor-pointer -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 rounded-full overflow-hidden bg-background/20 ring-1 ring-white/20">
              <div
                className="w-full h-full"
                style={{ transform: "scale(1.2)" }}
              >
                <Blurhash
                  hash={photo.blurData}
                  width={12}
                  height={12}
                  punch={1}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        ),
        popupContent: (
          <div className="group/popup">
            <div className="relative">
              <Image
                src={photo.url}
                alt={photo.title || "Photo"}
                width={500}
                height={500}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        ),
      })) || [];

  return (
    <MapProvider>
      <div className="flex">
        {/* Left content */}
        <div className="lg:w-7/12 w-full">
          {/* Filter */}
          <div className="flex items-center h-[68px] border-b px-4">
            {/* <FilterBar /> */}
          </div>

          <PhotoList />
        </div>

        {/* Right Content */}
        <div className="lg:w-5/12 w-full h-[calc(100vh-61px)] hidden lg:block bg-muted sticky top-[61px]">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-muted-foreground">Loading map...</div>
              </div>
            }
          >
            <MapboxComponent
              id="photosMap"
              initialViewState={{
                longitude: 121.2816980216146,
                latitude: 31.31395498607465,
                zoom: 3,
              }}
              markers={markers}
            />
          </Suspense>
        </div>
      </div>
    </MapProvider>
  );
};

export default Page;

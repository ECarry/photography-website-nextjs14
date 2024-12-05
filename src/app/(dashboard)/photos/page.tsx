"use client";

import dynamic from "next/dynamic";
import { MapProvider } from "react-map-gl";
import PhotoList from "../_components/photo-list";
import { Suspense } from "react";

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
                longitude: 116.4074,
                latitude: 39.9042,
                zoom: 10,
              }}
              showGeocoder
            />
          </Suspense>
        </div>
      </div>
    </MapProvider>
  );
};

export default Page;

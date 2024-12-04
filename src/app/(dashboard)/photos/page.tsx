"use client";

import Mapbox from "@/components/map";
import { MapProvider } from "react-map-gl";
import PhotoList from "../_components/photo-list";

const page = () => {
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
          <Mapbox
            id="photosMap"
            initialViewState={{
              longitude: 116.4074,
              latitude: 39.9042,
              zoom: 10,
            }}
            showGeocoder
          />
        </div>
      </div>
    </MapProvider>
  );
};

export default page;

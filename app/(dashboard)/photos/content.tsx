"use client";

import { MapProvider } from "react-map-gl";
import FilterBar from "../_components/filter";
import Mapbox from "../../../components/map";
import PhotoList from "../_components/photo-list";

const Content = () => {
  return (
    <MapProvider>
      <div className="grid grid-cols-12">
        {/* Left content  */}
        <div className="lg:col-span-7 col-span-12">
          {/* Filter */}
          <div className="flex items-center h-[68px] border-b px-4">
            <FilterBar />
          </div>

          <PhotoList />
        </div>

        {/* Right Content  */}
        <div className="col-span-5 sticky top-[61px] w-full max-h-dvh hidden lg:block bg-muted">
          <Mapbox />
        </div>
      </div>
    </MapProvider>
  );
};

export default Content;

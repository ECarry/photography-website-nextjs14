"use client";

import { useGetCitySets } from "@/features/city/api/use-get-city-sets";
import CityCard from "./city-card";
import CameraLoader from "@/components/camera-loader";

const CityList = () => {
  const { data: cityList, isLoading } = useGetCitySets();

  if (isLoading) {
    return (
      <div className="w-full min-h-[800px] flex items-center justify-center">
        <CameraLoader />
      </div>
    );
  }

  return (
    <div className="mt-3 w-full grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-[800px]">
      {cityList?.map((city) => (
        <CityCard key={city.id} title={city.city} coverId={city.coverPhotoId} />
      ))}
    </div>
  );
};

export default CityList;

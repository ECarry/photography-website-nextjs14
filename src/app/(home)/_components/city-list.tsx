"use client";

import { useGetCitySets } from "@/features/city/api/use-get-city-sets";
import CityCard from "./city-card";
import CameraLoader from "@/components/camera-loader";

const CityList = () => {
  const { data: cityList, isLoading } = useGetCitySets();

  console.log(cityList);

  if (isLoading) {
    return (
      <div className="w-full min-h-[70vh] flex items-start justify-center">
        <CameraLoader />
      </div>
    );
  }

  return (
    <div className="mt-3 w-full grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-[70vh]">
      {cityList?.map((city) => (
        <CityCard
          key={city.id}
          title={city.city}
          coverPhoto={city.coverPhoto}
        />
      ))}
    </div>
  );
};

export default CityList;

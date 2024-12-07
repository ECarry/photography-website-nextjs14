"use client";

import { useGetCity } from "@/features/city/api/use-get-city";
import CityCard from "./city-card";

const CityList = () => {
  const { data: cityList, isLoading } = useGetCity();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {cityList?.map((city) => (
        <CityCard key={city.id} title={city.city} coverId={city.coverPhotoId} />
      ))}
    </>
  );
};

export default CityList;

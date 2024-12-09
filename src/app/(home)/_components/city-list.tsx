"use client";

import { useGetCity } from "@/features/city/api/use-get-city";
import CityCard from "./city-card";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const CityCardSkeleton = () => {
  return (
    <div className="w-full relative">
      <AspectRatio ratio={0.75 / 1} className="overflow-hidden rounded-lg">
        <Skeleton className="w-full h-full absolute inset-0" />
      </AspectRatio>
    </div>
  );
};

const CityList = () => {
  const { data: cityList, isLoading } = useGetCity();

  if (isLoading) {
    return (
      <>
        {[...Array(6)].map((_, index) => (
          <CityCardSkeleton key={index} />
        ))}
      </>
    );
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

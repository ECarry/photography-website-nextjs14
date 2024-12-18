"use client";

import { useGetCitySets } from "@/features/city/api/use-get-city-sets";
import Footer from "../../_components/footer";
import Vector from "@/components/vector-bottom-right";
import { notFound } from "next/navigation";
import CameraLoader from "@/components/camera-loader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import BlurImage from "@/components/blur-image";

const CityPhotos = ({ cityName }: { cityName: string }) => {
  const { data, isLoading: isCitySetsLoading } = useGetCitySets();
  const decodedCityName = decodeURIComponent(cityName);

  const cityData = data?.find(
    (item) => item.city.toLowerCase() === decodedCityName.toLowerCase()
  );

  if (isCitySetsLoading) {
    return (
      <div className="size-full flex items-center justify-center">
        <CameraLoader />
      </div>
    );
  }
  if (!cityData) {
    return notFound();
  }

  const cityPhotos = cityData.photos.filter(
    (photo) => photo.id !== cityData.coverPhoto.id
  );

  return (
    <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row w-full">
      {/* LEFT CONTENT - Fixed */}
      <div className="w-full h-[70vh] lg:w-1/2 lg:fixed lg:top-0 lg:left-0 lg:h-screen p-0 lg:p-3">
        <div className="w-full h-full relative">
          <BlurImage
            src={cityData.coverPhoto.url}
            alt={cityData.city}
            fill
            quality={75}
            blurhash={cityData.coverPhoto.blurData}
            className="object-cover rounded-xl"
          />
          <div className="absolute right-0 bottom-0">
            <Vector title={decodedCityName} />
          </div>
        </div>
      </div>

      {/* Spacer for fixed left content */}
      <div className="hidden lg:block lg:w-1/2" />

      {/* RIGHT CONTENT - Scrollable */}
      <div className="w-full lg:w-1/2 space-y-3 pb-3">
        {/* CITY INFO CARD  */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          <div className="flex-1">
            <div className="flex flex-col p-10 gap-24 bg-muted rounded-xl font-light relative h-full">
              <div className="flex gap-4 items-center">
                {/* NAME  */}
                <div className="flex flex-col gap-[2px]">
                  <h1 className="text-4xl">{decodedCityName}</h1>
                </div>
              </div>

              <div>
                <p className="text-text-muted text-[15px]">
                  {cityData.description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full lg:max-w-[300px] flex flex-col gap-3">
            <div className="w-full h-full p-3 lg:p-5 bg-muted rounded-xl flex justify-between items-center">
              <p className="text-xs text-text-muted">Country</p>
              <p className="text-xs">{cityData.country}</p>
            </div>

            <div className="w-full h-full p-3 lg:p-5 bg-muted rounded-xl flex justify-between items-center">
              <p className="text-xs text-text-muted">City</p>
              <p className="text-xs">{cityData.city}</p>
            </div>

            <div className="w-full h-full p-3 lg:p-5 bg-muted rounded-xl flex justify-between items-center">
              <p className="text-xs text-text-muted">Year</p>
              <p className="text-xs">
                {new Date(
                  cityData.coverPhoto.dateTimeOriginal || ""
                ).getFullYear()}
              </p>
            </div>

            <div className="w-full h-full p-3 lg:p-5 bg-muted rounded-xl flex justify-between items-center">
              <p className="text-xs text-text-muted">Count</p>
              <p className="text-xs">{cityData.photoCount}</p>
            </div>
          </div>
        </div>

        {/* IMAGES  */}
        {cityPhotos.map((photo) => (
          <AspectRatio
            ratio={photo.aspectRatio}
            key={photo.id}
            className="overflow-hidden rounded-lg"
          >
            <BlurImage
              src={photo.url}
              alt={photo.title}
              fill
              blurhash={photo.blurData}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        ))}
        {/* FOOTER  */}
        <Footer />
      </div>
    </div>
  );
};

export default CityPhotos;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useGetCity } from "@/features/city/api/use-get-city";
import { useGetPhoto } from "@/features/photos/api/use-get-photo";
import Vector from "@/components/vector-bottom-right";
import CardContainer from "@/components/card-container";
import { PiArrowRight } from "react-icons/pi";

interface TravelCity {
  id: string;
  description: string | null;
  country: string;
  countryCode: string | null;
  city: string;
  coverPhotoId: string | null;
  photoCount: number | null;
  createAt: string | null;
  updateAt: string | null;
  photos: Array<{
    id: string;
    url: string;
  }>;
}

export default function TravelPage() {
  const [activeCity, setActiveCity] = useState<TravelCity | null>(null);
  const { data: citySetsData, isLoading: isCitySetsLoading } = useGetCity();
  const { data: coverData } = useGetPhoto(activeCity?.coverPhotoId || "");

  // Set first city as default active city
  useEffect(() => {
    if (citySetsData && citySetsData.length > 0 && !activeCity) {
      setActiveCity(citySetsData[0]);
    }
  }, [activeCity, citySetsData]);

  if (isCitySetsLoading) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-3 lg:gap-0 lg:flex-row w-full">
      {/* Left: Cover Photo */}
      <div className="w-full h-[70vh] lg:w-1/2 lg:fixed lg:top-0 lg:left-0 lg:h-screen p-0 lg:p-3">
        <div className="w-full h-full relative rounded-xl overflow-hidden">
          {coverData?.url && (
            <Image
              src={coverData.url}
              alt="Image"
              fill
              className="object-cover"
            />
          )}
          <div className="absolute right-0 bottom-0">
            <Vector title="Travel" />
          </div>
        </div>
      </div>

      {/* Spacer for fixed left content */}
      <div className="hidden lg:block lg:w-1/2" />

      {/* Right: City List */}
      <div className="w-full lg:w-1/2 space-y-3 pb-3">
        <CardContainer>
          <div className="flex flex-col p-12 gap-[128px]">
            <h1 className="text-3xl">Travel</h1>
            <div className="flex flex-col gap-4 font-light">
              <p>
                With a focus on both candid moments and stunning landscapes, I
                strive to evoke emotion and tell stories through my work. My
                photography blends the rawness of everyday life with the
                artistry of fine art, allowing viewers to connect with each
                image on a deeper level.
              </p>
            </div>
          </div>
        </CardContainer>
        <div className="space-y-3">
          {citySetsData?.map((city) => (
            <div
              key={city.id}
              className="w-full p-5 bg-muted hover:bg-muted-hover rounded-xl flex justify-between items-center cursor-pointer group transition-all duration-150 ease-[cubic-bezier(0.22, 1, 0.36, 1)] flex-1"
              onMouseEnter={() => setActiveCity(city)}
            >
              <p className="text-sm">{city.city}</p>

              <div className="relative overflow-hidden min-w-[300px] flex justify-end">
                <div className="flex items-center gap-2 transform transition-transform duration-200 ease-in-out group-hover:-translate-x-7">
                  <span className="font-light text-sm whitespace-nowrap text-right">
                    {city.country}
                  </span>
                </div>
                <div className="absolute right-0 transform translate-x-full transition-transform duration-200 ease-in-out group-hover:translate-x-0 flex items-center">
                  <PiArrowRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

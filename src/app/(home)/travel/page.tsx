"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Vector from "@/components/vector-bottom-right";
import CardContainer from "@/components/card-container";
import { PiArrowRight } from "react-icons/pi";
import ContactCard from "../_components/contact-card";
import Footer from "../_components/footer";
import { useGetCity, ResponseType } from "@/features/city/api/use-get-city";
import { ResponseType as PhotoResponseType } from "@/features/photos/api/use-get-photo";

// Types
type CitySets = ResponseType["data"][0];
type Photo = PhotoResponseType["data"];
interface CitySetsWithCoverPhoto extends CitySets {
  coverPhoto: Photo | null;
}

interface CoverPhotoProps {
  url: string | undefined;
  city: string | undefined;
}

// Components
const CoverPhoto = ({ url, city }: CoverPhotoProps) => (
  <div className="w-full h-[70vh] lg:w-1/2 lg:fixed lg:top-0 lg:left-0 lg:h-screen p-0 lg:p-3">
    <div className="w-full h-full relative rounded-xl overflow-hidden">
      {url && <Image src={url} alt="Cover" fill className="object-cover" />}
      <div className="absolute right-0 bottom-0">
        <Vector title={city || ""} />
      </div>
    </div>
  </div>
);

const Introduction = () => (
  <CardContainer>
    <div className="flex flex-col p-12 gap-[128px]">
      <h1 className="text-3xl">Travel</h1>
      <div className="flex flex-col gap-4 font-light">
        <p>
          Exploring the world one step at a time, capturing life through street
          photography and city walks. From bustling urban corners to hidden
          alleyways, every journey tells a unique story through the lens.
        </p>
      </div>
    </div>
  </CardContainer>
);

const CityItem = ({
  city,
  onMouseEnter,
}: {
  city: CitySetsWithCoverPhoto;
  onMouseEnter: (city: CitySetsWithCoverPhoto) => void;
}) => (
  <div
    key={city.id}
    className="w-full p-5 bg-muted hover:bg-muted-hover rounded-xl flex justify-between items-center cursor-pointer group transition-all duration-150 ease-[cubic-bezier(0.22, 1, 0.36, 1)] flex-1"
    onMouseEnter={() => onMouseEnter(city)}
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
);

// Main Component
export default function TravelPage() {
  const [activeCity, setActiveCity] = useState<CitySetsWithCoverPhoto | null>(
    null
  );
  const { data: citySetsData, isLoading: isCitySetsLoading } = useGetCity();

  useEffect(() => {
    if (citySetsData?.length && !activeCity) {
      setActiveCity(citySetsData[0] as CitySetsWithCoverPhoto);
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
      <CoverPhoto url={activeCity?.coverPhoto?.url} city={activeCity?.city} />

      {/* Spacer for fixed left content */}
      <div className="hidden lg:block lg:w-1/2" />

      {/* Right: City List */}
      <div className="w-full lg:w-1/2 space-y-3 pb-3">
        <Introduction />

        <div className="space-y-3">
          {citySetsData?.map((city) => (
            <CityItem
              key={city.id}
              city={city as CitySetsWithCoverPhoto}
              onMouseEnter={setActiveCity}
            />
          ))}
        </div>

        <ContactCard
          title="Contact me"
          className="bg-primary hover:bg-primary-hover text-white dark:text-black max-h-14"
        />
        <Footer />
      </div>
    </main>
  );
}

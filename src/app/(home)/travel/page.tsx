"use client";

// External dependencies
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Internal dependencies - UI Components
import Footer from "../_components/footer";
import { PiArrowRight } from "react-icons/pi";
import BlurImage from "@/components/blur-image";
import TextScroll from "@/components/text-scroll";
import Vector from "@/components/vector-bottom-right";
import CameraLoader from "@/components/camera-loader";
import MotionFadeIn from "@/components/motion-fade-in";
import CardContainer from "@/components/card-container";

// Hooks & Types
import { useGetCitySets } from "@/features/city/api/use-get-city-sets";
import { type CitySetWithRelations } from "@/app/api/[[...route]]/city";

// Types
interface CoverPhotoProps {
  url: string | undefined;
  city: string | undefined;
  blurData: string | undefined;
}

// Components
const CoverPhoto = ({ url, city, blurData }: CoverPhotoProps) => {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (url !== currentUrl) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setCurrentUrl(url);
        setIsTransitioning(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [url, currentUrl]);

  return (
    <div className="w-full h-[70vh] lg:w-1/2 lg:fixed lg:top-0 lg:left-0 lg:h-screen p-0 lg:p-3">
      <div className="w-full h-full relative rounded-xl overflow-hidden">
        {currentUrl && blurData && (
          <BlurImage
            src={currentUrl}
            alt={city || ""}
            fill
            quality={75}
            blurhash={blurData}
            className={cn(
              "object-cover transition-all duration-300 ease-in-out",
              isTransitioning ? "opacity-0" : "opacity-100"
            )}
          />
        )}
        <div className="absolute right-0 bottom-0">
          <Vector title={city || ""} />
        </div>
      </div>
    </div>
  );
};

const Introduction = () => (
  <CardContainer>
    <div className="flex flex-col p-12 gap-[128px]">
      <h1 className="text-4xl">Travel</h1>
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

interface CityItemProps {
  city: CitySetWithRelations;
  onMouseEnter: (city: CitySetWithRelations) => void;
}

const CityItem = ({ city, onMouseEnter }: CityItemProps) => {
  const router = useRouter();

  return (
    <div
      key={city.id}
      className="w-full py-5 px-3 bg-muted hover:bg-muted-hover rounded-xl grid grid-cols-2 items-center cursor-pointer group transition-all duration-150 ease-[cubic-bezier(0.22, 1, 0.36, 1)] flex-1 overflow-hidden"
      onMouseEnter={() => onMouseEnter(city)}
      onClick={() => router.push(`/travel/${city.city}`)}
    >
      <p className="text-xs lg:text-sm line-clamp-1">{city.city}</p>

      <div className="relative overflow-hidden flex justify-end">
        <div className="flex items-center gap-2 transform transition-transform duration-200 ease-in-out group-hover:-translate-x-7">
          <span className="font-light text-xs lg:text-sm whitespace-nowrap text-right">
            <TextScroll className="w-28 lg:w-full">{city.country}</TextScroll>
          </span>
        </div>
        <div className="absolute right-0 transform translate-x-full transition-transform duration-200 ease-in-out group-hover:translate-x-0 flex items-center">
          <PiArrowRight size={18} />
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function TravelPage() {
  const [activeCity, setActiveCity] = useState<CitySetWithRelations | null>(
    null
  );
  const { data: citySetsData, isLoading: isCitySetsLoading } = useGetCitySets();

  useEffect(() => {
    if (!activeCity && citySetsData && citySetsData.length > 0) {
      setActiveCity(citySetsData[0]);
    }
  }, [activeCity, citySetsData]);

  if (isCitySetsLoading) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center">
        <CameraLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      <CoverPhoto
        url={activeCity?.coverPhoto?.url}
        city={activeCity?.city}
        blurData={activeCity?.coverPhoto?.blurData}
      />

      {/* Spacer for fixed left content */}
      <div className="hidden lg:block lg:w-1/2" />

      {/* RIGHT CONTENT - Scrollable */}
      <div className="w-full mt-3 lg:mt-0 lg:w-1/2 space-y-3 pb-3">
        <MotionFadeIn delay={0.1}>
          <Introduction />
        </MotionFadeIn>

        <div className="space-y-3">
          {citySetsData?.map((city, index) => (
            <MotionFadeIn key={city.id} delay={0.2 + index * 0.1}>
              <CityItem city={city} onMouseEnter={setActiveCity} />
            </MotionFadeIn>
          ))}
        </div>

        <MotionFadeIn>
          <Footer />
        </MotionFadeIn>
      </div>
    </div>
  );
}

"use client";

import Vector from "@/components/vector-bottom-right";
import Mapbox from "@/components/map";
import { useGetPhotos } from "@/features/photos/api/use-get-photos";
import type { MapboxProps } from "@/components/map";
import Image from "next/image";
import { Blurhash } from "react-blurhash";

const MapPage = () => {
  const { data: photos } = useGetPhotos();

  const markers: MapboxProps["markers"] =
    photos
      ?.filter(
        (
          photo
        ): photo is typeof photo & { longitude: number; latitude: number } =>
          photo.longitude !== null && photo.latitude !== null
      )
      .map((photo) => ({
        id: photo.id,
        longitude: photo.longitude,
        latitude: photo.latitude,
        element: (
          <div className="relative group cursor-pointer -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 rounded-full overflow-hidden bg-background/20 ring-1 ring-white/20">
              <div
                className="w-full h-full"
                style={{ transform: "scale(1.2)" }}
              >
                <Blurhash
                  hash={photo.blurData}
                  width={12}
                  height={12}
                  punch={1}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        ),
        popupContent: (
          <div className="group/popup">
            <div className="relative">
              <Image
                src={photo.url}
                alt={photo.title || "Photo"}
                width={500}
                height={500}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        ),
      })) || [];

  return (
    <div className="w-full h-full rounded-[18px] overflow-hidden relative">
      <Mapbox
        initialViewState={{
          longitude: 121.2816980216146,
          latitude: 31.31395498607465,
          zoom: 3,
        }}
        markers={markers}
      />

      <div className="absolute right-0 bottom-0 z-50">
        <Vector title="Discover" />
      </div>
    </div>
  );
};

export default MapPage;

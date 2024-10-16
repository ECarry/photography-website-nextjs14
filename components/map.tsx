"use client";

import { useGetPhotos } from "@/features/photos/api/use-get-photos";
import { useEffect, useState } from "react";
import Map, { NavigationControl, Marker, useMap } from "react-map-gl";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface Props {
  showLocal?: boolean;
}

const Mapbox = ({ showLocal = true }: Props) => {
  const { map } = useMap();
  const [coords, setCoords] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });

  const photosQuery = useGetPhotos();

  const photos = photosQuery.data || [];

  useEffect(() => {
    if (!showLocal) return;
    // 检查浏览器是否支持 Geolocation API
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      return;
    }

    // 使用 Geolocation API 获取位置信息
    navigator.geolocation.getCurrentPosition(
      (position) => {
        map?.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 17,
        });

        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, [map, showLocal]);

  return (
    <Map
      id="map"
      mapboxAccessToken={TOKEN}
      style={{
        width: "100%",
        height: "100%",
      }}
      mapStyle="mapbox://styles/ecarry/cldmhu6tr000001n33ujbxf7j"
    >
      <NavigationControl />
      {coords.latitude && coords.longitude && (
        <Marker
          longitude={coords.longitude}
          latitude={coords.latitude}
          anchor="bottom"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
        </Marker>
      )}
      {photos.map((photo) => {
        if (!photo.latitude || !photo.longitude) return null;
        return (
          <Marker
            key={photo.id}
            longitude={photo.longitude}
            latitude={photo.latitude}
            anchor="bottom"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </Marker>
        );
      })}
    </Map>
  );
};

export default Mapbox;

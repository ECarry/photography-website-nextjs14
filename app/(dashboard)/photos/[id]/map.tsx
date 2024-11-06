"use client";

import { useEditPhoto } from "@/features/photos/api/use-edit-photo";
import { getReverseGeocoding } from "@/lib/map";
import Map, {
  NavigationControl,
  Marker,
  FullscreenControl,
} from "react-map-gl";

import GeocoderControl from "./geocoder-control";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface Props {
  id: string;
  latitude?: number | null;
  longitude?: number | null;
}

const Mapbox = ({ id, latitude, longitude }: Props) => {
  const editMutation = useEditPhoto(id);

  const viewState = latitude &&
    longitude && {
      latitude,
      longitude,
      zoom: 14,
    };

  const handleClick = async (event: any) => {
    const address = await getReverseGeocoding(
      event.lngLat.lng,
      event.lngLat.lat
    );

    editMutation.mutate(
      {
        latitude: event.lngLat.lat,
        longitude: event.lngLat.lng,
        locationName: address,
      },
      { onSuccess: () => console.log("success") }
    );
  };

  return (
    <Map
      id="map"
      mapboxAccessToken={TOKEN}
      style={{
        width: "100%",
        height: "100%",
      }}
      initialViewState={{ ...viewState }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onClick={handleClick}
    >
      {TOKEN && (
        <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" />
      )}
      <NavigationControl />
      <FullscreenControl />
      {latitude && longitude && (
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </Marker>
      )}
    </Map>
  );
};

export default Mapbox;

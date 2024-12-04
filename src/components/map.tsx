"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Map, {
  GeolocateControl,
  Layer,
  MapRef,
  Marker,
  NavigationControl,
  Popup,
  Source,
} from "react-map-gl";
import type { LayerProps } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import type { GeocoderOptions } from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as mapboxgl from "mapbox-gl";

interface MapboxProps {
  id?: string;
  initialViewState?: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  markers?: Array<{
    id: string;
    longitude: number;
    latitude: number;
    popupContent?: React.ReactNode;
  }>;
  geoJsonData?: GeoJSON.FeatureCollection;
  onMarkerDragEnd?: (lngLat: { lng: number; lat: number }) => void;
  onGeoJsonClick?: (feature: GeoJSON.Feature) => void;
  draggableMarker?: boolean;
  showGeocoder?: boolean;
}

const Mapbox = ({
  id,
  initialViewState = {
    longitude: -122.4,
    latitude: 37.8,
    zoom: 14,
  },
  markers = [],
  geoJsonData,
  onMarkerDragEnd,
  onGeoJsonClick,
  draggableMarker = false,
  showGeocoder = false,
}: MapboxProps) => {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<{
    id: string;
    longitude: number;
    latitude: number;
    content: React.ReactNode;
  } | null>(null);

  // GeoJSON layer style
  const layerStyle: LayerProps = {
    id: "data",
    type: "fill",
    paint: {
      "fill-color": "#0080ff",
      "fill-opacity": 0.5,
    },
  };

  // Add Geocoder control
  useEffect(() => {
    if (!showGeocoder || !mapRef.current) return;

    const map = mapRef.current;
    const geocoderOptions: GeocoderOptions = {
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!,
      mapboxgl: mapboxgl,
    };
    const geocoder = new MapboxGeocoder(geocoderOptions);

    map.getMap().addControl(geocoder);

    return () => {
      if (map) {
        map.getMap().removeControl(geocoder);
      }
    };
  }, [showGeocoder]);

  // Handle GeoJSON click
  const onClick = useCallback(
    (
      event: mapboxgl.MapMouseEvent & {
        features?: mapboxgl.MapboxGeoJSONFeature[];
      }
    ) => {
      if (!onGeoJsonClick) return;

      const feature = event.features?.[0];
      if (feature) {
        onGeoJsonClick(feature as GeoJSON.Feature);
      }
    },
    [onGeoJsonClick]
  );

  // Fly to location
  const flyToLocation = useCallback((longitude: number, latitude: number) => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      duration: 2000,
      zoom: 14,
    });
  }, []);

  return (
    <Map
      id={id}
      ref={mapRef}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={initialViewState}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      interactiveLayerIds={geoJsonData ? ["data"] : undefined}
      onClick={onClick}
    >
      {/* Navigation Controls */}
      <NavigationControl position="top-right" />
      <GeolocateControl
        position="top-right"
        trackUserLocation
        onGeolocate={(e) => {
          flyToLocation(e.coords.longitude, e.coords.latitude);
        }}
      />

      {/* Markers */}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          longitude={marker.longitude}
          latitude={marker.latitude}
          draggable={draggableMarker}
          onDragEnd={
            onMarkerDragEnd ? (e) => onMarkerDragEnd(e.lngLat) : undefined
          }
          onClick={() => {
            if (marker.popupContent) {
              setPopupInfo({
                id: marker.id,
                longitude: marker.longitude,
                latitude: marker.latitude,
                content: marker.popupContent,
              });
            }
          }}
        />
      ))}

      {/* Popup */}
      {popupInfo && (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          anchor="bottom"
          onClose={() => setPopupInfo(null)}
        >
          {popupInfo.content}
        </Popup>
      )}

      {/* GeoJSON Layer */}
      {geoJsonData && (
        <Source type="geojson" data={geoJsonData}>
          <Layer {...layerStyle} />
        </Source>
      )}
    </Map>
  );
};

export default Mapbox;

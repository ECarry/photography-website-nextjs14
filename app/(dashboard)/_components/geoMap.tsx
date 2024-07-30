"use client";

import Map, { Layer, Source } from "react-map-gl";
import type { FillLayer } from "react-map-gl";
import type { FeatureCollection } from "geojson";
import geoData from "@/public/geo.json";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const geojson: FeatureCollection = geoData as FeatureCollection;

const getCountryCoordinates = (country: string) => {
  const countryData = geojson.features.find(
    (feature) =>
      feature.properties?.name.toLowerCase() === country.toLowerCase()
  );

  return countryData;
};

const chinaData = getCountryCoordinates("china");

const layerStyle: FillLayer = {
  id: "country-fill",
  type: "fill",
  paint: {
    "fill-color": "#0ea5e9",
    "fill-opacity": 0.5,
  },
};

const GeoMap = () => {
  return (
    <Map
      id="map"
      mapboxAccessToken={TOKEN}
      initialViewState={{
        zoom: 0,
      }}
      doubleClickZoom={false}
      scrollZoom={false}
      dragPan={false}
      boxZoom={false}
      style={{
        width: "100%",
        height: "100%",
      }}
      mapStyle="mapbox://styles/ecarry/cldmhu6tr000001n33ujbxf7j"
    >
      <Source id="my-data" type="geojson" data={chinaData}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
};

export default GeoMap;

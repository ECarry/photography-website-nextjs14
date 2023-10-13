'use client'

import * as React from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxProps {
  longitude?: number | null;
  latitude?: number | null;
}

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
const mapStyle = 'mapbox://styles/ecarry/cldmhu6tr000001n33ujbxf7j'

const style = {
  width: '100%',
  height: '100%',
}

const Mapbox = ({
  longitude,
  latitude
}: MapboxProps) => {
  console.log('=======>', longitude, latitude);
  
  const initialViewState = {
    longitude: -122.4,
    latitude: 37.8,
    zoom: 14
  }

  return (
    <Map
      mapboxAccessToken={token}
      initialViewState={initialViewState}
      style={style}
      mapStyle={mapStyle}
    >
      <NavigationControl />
    </Map>
  );
}

export default Mapbox

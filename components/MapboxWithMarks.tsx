'use client'

import { useState } from 'react';
import Map, { Marker, NavigationControl, FullscreenControl } from 'react-map-gl';
import { useTheme } from 'next-themes'

import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from './Pin';
import { Photo } from '@prisma/client';

interface MapboxProps {
  photos: Photo[]
}

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const MapboxWithMarks = ({
 photos
}: MapboxProps) => {
  const [viewport, setViewport] = useState({
    longitude: 118.11884581031154,
    latitude: 24.48566148816093,
    zoom: 5,
    localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif"
  })
  const { theme } = useTheme()

  return (
    <Map
      initialViewState={{...viewport}}
      mapboxAccessToken={token}
      mapStyle={theme === 'dark' ? 'mapbox://styles/ecarry/clp8hcmd300km01qx78rt0xaw' : 'mapbox://styles/ecarry/cldmhu6tr000001n33ujbxf7j' }
    >
      {photos.length > 0 ? (
        <>
          {photos.map((photo: Photo) => (
            photo.latitude !== null && photo.longitude !== null && (
            <Marker key={photo.id} latitude={photo?.latitude} longitude={photo?.longitude}>
              <Pin />
            </Marker>
            )
          ))}
        </>
      ) :
      null
      }
      <NavigationControl />
      <FullscreenControl />
    </Map>
  );
}

export default MapboxWithMarks

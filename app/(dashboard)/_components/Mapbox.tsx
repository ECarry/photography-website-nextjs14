'use client'

import { useState } from 'react';
import Map, { Marker, NavigationControl, ViewState, MapLayerMouseEvent, FullscreenControl } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from '@/components/Pin';
import { toast } from '@/components/ui/use-toast';

interface MapboxProps {
  longitude: number| null;
  latitude: number | null;
  photoId: string;
}

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const Mapbox = ({
  latitude,
  longitude,
  photoId
}: MapboxProps) => {
  const [newPlace, setNewPlace] = useState([latitude, longitude])
  const [viewport, setViewport] = useState({
    longitude: longitude || 118.11884581031154,
    latitude: latitude || 24.48566148816093,
    zoom: 8,
    localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif"
  })

  const handleMapClick = async (e: MapLayerMouseEvent) => {
    console.log(e.lngLat);
    
    setNewPlace([
      e.lngLat.lat,
      e.lngLat.lng
    ])

    try {
      await fetch(`/api/photos/${photoId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          id: photoId,
          data: {
            latitude: e.lngLat.lat,
            longitude: e.lngLat.lng
          }
        })
      })

      toast({
        title: 'Coordinate Update Successful'
      })
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <Map
      initialViewState={{...viewport}}
      mapboxAccessToken={token}
      mapStyle='mapbox://styles/ecarry/cldmhu6tr000001n33ujbxf7j'
      onClick={handleMapClick}
    >
      <Marker latitude={newPlace[0]!} longitude={newPlace[1]!} >
        <Pin />
      </Marker>
      <NavigationControl />
      <FullscreenControl />
    </Map>
  );
}

export default Mapbox

'use client'

import { useState } from 'react';
import ReactMapGl, { Marker, NavigationControl, ViewState, MapLayerMouseEvent, FullscreenControl } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from './Pin';

interface MapboxProps {
  longitude?: number | null;
  latitude?: number | null;
}

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const style = {
  width: '100%',
  height: '100%',
}

const Mapbox = ({

}: MapboxProps) => {
  const [newPlace, setNewPlace] = useState({
    latitude: 37.8,
    longitude: -122.4 
  })
  const [viewport, setViewport] = useState<ViewState>({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 14,
    bearing: 0,
    pitch: 0,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  })

  const handleMapClick = (e: MapLayerMouseEvent) => {
    console.log(e.lngLat);
    
    setNewPlace({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    })
  }

  return (
    <ReactMapGl
      {...viewport}
      mapboxAccessToken={token}
      style={style}
      mapStyle='mapbox://styles/ecarry/cldmhu6tr000001n33ujbxf7j'
      onClick={handleMapClick}
    >
      <Marker latitude={newPlace.latitude} longitude={newPlace.longitude}>
        <Pin />
      </Marker>
      <NavigationControl />
      <FullscreenControl />
    </ReactMapGl>
  );
}

export default Mapbox

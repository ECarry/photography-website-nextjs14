import * as React from "react";
import { useState, useEffect } from "react";
import { useControl, Marker, MarkerProps, ControlPosition } from "react-map-gl";
import MapboxGeocoder, { GeocoderOptions } from "@mapbox/mapbox-gl-geocoder";

type GeocoderControlProps = Omit<
  GeocoderOptions,
  "accessToken" | "mapboxgl" | "marker"
> & {
  mapboxAccessToken: string;
  marker?: boolean | Omit<MarkerProps, "longitude" | "latitude">;
  position: ControlPosition;
  onLoading?: (e: object) => void;
  onResults?: (e: object) => void;
  onResult?: (e: object) => void;
  onError?: (e: object) => void;
};

const noop = () => {};

export default function GeocoderControl(props: GeocoderControlProps) {
  const [marker, setMarker] = useState<JSX.Element | null>(null); // State for marker (JSX.Element or null)

  const geocoder = useControl<MapboxGeocoder>(
    () => {
      const ctrl = new MapboxGeocoder({
        ...props,
        marker: false,
        accessToken: props.mapboxAccessToken,
      });

      // Use `noop` if handler is not defined
      ctrl.on("loading", props.onLoading || noop);
      ctrl.on("results", props.onResults || noop);
      ctrl.on("result", (evt) => {
        (props.onResult || noop)(evt); // Use `noop` if `onResult` is undefined
        const { result } = evt;
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === "Point" && result.geometry.coordinates));

        if (location && props.marker) {
          const [longitude, latitude] = location;
          if (props.marker !== true) {
            setMarker(
              <Marker
                {...props.marker}
                longitude={longitude}
                latitude={latitude}
              />
            ); // This should be valid because `Marker` is JSX.Element
          } else {
            setMarker(<Marker longitude={longitude} latitude={latitude} />); // This should also be valid
          }
        } else {
          setMarker(null); // Set marker to null if no location is found
        }
      });
      ctrl.on("error", props.onError || noop); // Use `noop` if `onError` is undefined

      return ctrl;
    },
    { position: props.position }
  );

  useEffect(() => {
    // @ts-ignore
    if (geocoder._map) {
      if (
        geocoder.getProximity() !== props.proximity &&
        props.proximity !== undefined
      ) {
        geocoder.setProximity(props.proximity);
      }
      if (
        geocoder.getRenderFunction() !== props.render &&
        props.render !== undefined
      ) {
        geocoder.setRenderFunction(props.render);
      }
      if (
        geocoder.getLanguage() !== props.language &&
        props.language !== undefined
      ) {
        geocoder.setLanguage(props.language);
      }
      if (geocoder.getZoom() !== props.zoom && props.zoom !== undefined) {
        geocoder.setZoom(props.zoom);
      }
      if (geocoder.getFlyTo() !== props.flyTo && props.flyTo !== undefined) {
        geocoder.setFlyTo(props.flyTo);
      }
      if (
        geocoder.getPlaceholder() !== props.placeholder &&
        props.placeholder !== undefined
      ) {
        geocoder.setPlaceholder(props.placeholder);
      }
      if (
        geocoder.getCountries() !== props.countries &&
        props.countries !== undefined
      ) {
        geocoder.setCountries(props.countries);
      }
      if (geocoder.getTypes() !== props.types && props.types !== undefined) {
        geocoder.setTypes(props.types);
      }
      if (
        geocoder.getMinLength() !== props.minLength &&
        props.minLength !== undefined
      ) {
        geocoder.setMinLength(props.minLength);
      }
      if (geocoder.getLimit() !== props.limit && props.limit !== undefined) {
        geocoder.setLimit(props.limit);
      }
      if (geocoder.getFilter() !== props.filter && props.filter !== undefined) {
        geocoder.setFilter(props.filter);
      }
      if (geocoder.getOrigin() !== props.origin && props.origin !== undefined) {
        geocoder.setOrigin(props.origin);
      }
    }
  }, [geocoder, props]); // Update the geocoder configuration if any prop changes

  return marker;
}

GeocoderControl.defaultProps = {
  marker: true,
  onLoading: noop,
  onResults: noop,
  onResult: noop,
  onError: noop,
};

"use client";

// External dependencies
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Internal dependencies - UI Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "../../r2/components/image-upload";

// Internal dependencies - Types & Schema
import { PhotoFormData, photoSchema } from "../schema/new-photo-schema";
import type { ExifData, ImageInfo } from "../utils";

// Internal dependencies - Hooks & Store
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState, useMemo } from "react";
import useNewPhotoSheet from "../store/use-new-photo-sheet";
import { useCreatePhoto } from "../api/use-create-photo";
import { useGetLocation } from "@/features/map/api/use-get-location";

const MapboxComponent = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full rounded-md border flex items-center justify-center bg-muted">
      <div className="text-muted-foreground">Loading map...</div>
    </div>
  ),
});

const NewPhotoForm = () => {
  const { onClose } = useNewPhotoSheet();
  const [exif, setExif] = useState<ExifData | null>(null);
  const [imageInfo, setImageInfo] = useState<ImageInfo>();
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    // Default to Beijing
    lat: 39.9042,
    lng: 116.4074,
  });

  const { mutate: createPhoto, isPending: isCreating } = useCreatePhoto();
  const { data: location, isPending: isLocationPending } = useGetLocation({
    lat: String(currentLocation.lat),
    lng: String(currentLocation.lng),
  });

  const isDisabled = isCreating || isLocationPending;

  // Initialize form with default values
  const form = useForm<PhotoFormData>({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
      fullAddress: "",
      latitude: currentLocation.lat,
      longitude: currentLocation.lng,
    },
  });

  // Get current location in background
  useEffect(() => {
    // Don't get current location if we already have EXIF data with coordinates
    if ("geolocation" in navigator && !exif?.latitude && !exif?.longitude) {
      const timeoutId = setTimeout(() => {
        try {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const newLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              setCurrentLocation(newLocation);

              // Only update form if no EXIF data
              form.setValue("latitude", newLocation.lat);
              form.setValue("longitude", newLocation.lng);
            },
            (error) => {
              console.warn("Unable to get location:", error.message);
              // Keep using default location (Beijing coordinates)
            },
            {
              timeout: 5000,
              maximumAge: 0,
              enableHighAccuracy: false,
            }
          );
        } catch (error) {
          console.warn("Geolocation error:", error);
          // Keep using default location (Beijing coordinates)
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [exif, form]);

  // Watch form values
  const { latitude, longitude } = useWatch({
    control: form.control,
    defaultValue: {
      latitude: currentLocation.lat,
      longitude: currentLocation.lng,
    },
  });

  // Update location data when coordinates change
  useEffect(() => {
    if (latitude && longitude) {
      // Reset the address while loading
      form.setValue("fullAddress", "Loading address...");
      setCurrentLocation({
        lat: latitude,
        lng: longitude,
      });
    }
  }, [latitude, longitude, form]);

  // Update form when location data is available
  useEffect(() => {
    if (location?.features?.[0]?.properties?.full_address) {
      form.setValue(
        "fullAddress",
        location.features[0].properties.full_address
      );
    }
  }, [location, form]);

  // Memoize map values to reduce re-renders
  const mapValues = useMemo(() => {
    return {
      markers: [
        {
          id: "location",
          longitude: longitude || currentLocation.lng,
          latitude: latitude || currentLocation.lat,
        },
      ],
      initialViewState: {
        longitude: longitude || currentLocation.lng,
        latitude: latitude || currentLocation.lat,
        zoom: 2,
      },
    };
  }, [latitude, longitude, currentLocation.lat, currentLocation.lng]);

  /**
   * Handles form submission
   * @param {PhotoFormData} values - Form data to be submitted
   */
  const onSubmit = (values: PhotoFormData) => {
    if (!exif || !imageInfo) {
      return;
    }

    const data = {
      url: values.url,
      title: values.title,
      description: values.description,
      aspectRatio: imageInfo.aspectRatio,
      width: imageInfo.width,
      height: imageInfo.height,
      blurData: imageInfo.blurhash,
      make: exif?.make,
      model: exif?.model,
      lensModel: exif?.lensModel,
      focalLength: exif?.focalLength,
      focalLength35mm: exif?.focalLength35mm,
      fNumber: exif?.fNumber,
      iso: exif?.iso,
      exposureTime: exif?.exposureTime,
      exposureCompensation: exif?.exposureCompensation,
      latitude: exif?.latitude ?? values.latitude,
      longitude: exif?.longitude ?? values.longitude,
      gpsAltitude: exif?.gpsAltitude,
      dateTimeOriginal: exif?.dateTimeOriginal?.toString() ?? null,
      country: location?.features[0].properties.context.country?.name,
      countryCode:
        location?.features[0].properties.context.country?.country_code,
      region: location?.features[0].properties.context.region?.name,
      city:
        location?.features[0].properties.context.country.country_code ===
          "JP" ||
        location?.features[0].properties.context.country.country_code === "TW"
          ? location?.features[0].properties.context.region?.name
          : location?.features[0].properties.context.place?.name,
      district: location?.features[0].properties.context.locality?.name,
      fullAddress: location?.features[0].properties.full_address,
      placeFormatted: location?.features[0].properties.place_formatted,
    };

    try {
      createPhoto(data, {
        onSuccess: () => {
          onCloseSheet();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Handles form closure and reset
   */
  const onCloseSheet = () => {
    form.reset();
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* File Upload */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={({ url, exif, imageInfo }) => {
                    form.setValue("url", url);
                    if (exif) {
                      form.setValue("latitude", exif.latitude);
                      form.setValue("longitude", exif.longitude);
                    }

                    setExif(exif);
                    setImageInfo(imageInfo);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isDisabled}
                  placeholder="Enter photo title"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isDisabled}
                  placeholder="Enter photo description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GPS Coordinates Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled}
                      type="number"
                      step="any"
                      placeholder="Latitude"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled}
                      type="number"
                      step="any"
                      placeholder="Longitude"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Map */}
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <div className="h-[300px] w-full rounded-md border">
                <Suspense
                  fallback={
                    <div className="h-full w-full flex items-center justify-center bg-muted">
                      <div className="text-muted-foreground">
                        Loading map...
                      </div>
                    </div>
                  }
                >
                  <MapboxComponent
                    draggableMarker
                    markers={mapValues.markers}
                    initialViewState={mapValues.initialViewState}
                    onMarkerDragEnd={(data) => {
                      form.setValue("latitude", data.lat);
                      form.setValue("longitude", data.lng);
                    }}
                  />
                </Suspense>
              </div>
            </FormControl>
            <FormDescription>
              Drag the marker to set the photo location
            </FormDescription>
          </FormItem>
        </div>

        <FormField
          control={form.control}
          name="fullAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Address</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button
            disabled={isDisabled}
            type="button"
            variant="outline"
            onClick={onCloseSheet}
          >
            Cancel
          </Button>
          <Button disabled={isDisabled} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewPhotoForm;

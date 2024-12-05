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

  const createPhoto = useCreatePhoto();

  // Initialize form with default values
  const form = useForm<PhotoFormData>({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
      gpsLatitude: exif?.gpsLatitude ?? currentLocation.lat,
      gpsLongitude: exif?.gpsLongitude ?? currentLocation.lng,
    },
  });

  // Get current location in background
  useEffect(() => {
    if ("geolocation" in navigator) {
      const timeoutId = setTimeout(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCurrentLocation(newLocation);

            // Only update form if no EXIF data
            if (!exif?.gpsLatitude && !exif?.gpsLongitude) {
              form.setValue("gpsLatitude", newLocation.lat);
              form.setValue("gpsLongitude", newLocation.lng);
            }
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      }, 500); // Delay geolocation request

      return () => clearTimeout(timeoutId);
    }
  }, [exif, form]);

  // Watch form values
  const { gpsLatitude, gpsLongitude } = useWatch({
    control: form.control,
    defaultValue: {
      gpsLatitude: currentLocation.lat,
      gpsLongitude: currentLocation.lng,
    },
  });

  // Memoize map values to reduce re-renders
  const mapValues = useMemo(() => {
    return {
      markers: [
        {
          id: "location",
          longitude: gpsLongitude || currentLocation.lng,
          latitude: gpsLatitude || currentLocation.lat,
        },
      ],
      initialViewState: {
        longitude: gpsLongitude || currentLocation.lng,
        latitude: gpsLatitude || currentLocation.lat,
        zoom: 10,
      },
    };
  }, [gpsLatitude, gpsLongitude, currentLocation.lat, currentLocation.lng]);

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
      gpsLatitude: exif?.gpsLatitude ?? values.gpsLatitude,
      gpsLongitude: exif?.gpsLongitude ?? values.gpsLongitude,
      gpsAltitude: exif?.gpsAltitude,
      dateTimeOriginal: exif?.dateTimeOriginal?.toString() ?? null,
    };

    try {
      createPhoto.mutate(data, {
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
                <Input placeholder="Enter photo title" autoFocus {...field} />
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
              name="gpsLatitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
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
              name="gpsLongitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
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
                      form.setValue("gpsLatitude", data.lat);
                      form.setValue("gpsLongitude", data.lng);
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

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCloseSheet}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default NewPhotoForm;

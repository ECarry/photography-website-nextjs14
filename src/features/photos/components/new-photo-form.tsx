"use client";

// External dependencies
import { zodResolver } from "@hookform/resolvers/zod";

// Internal dependencies - UI Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Internal dependencies - Types & Schema
import { PhotoFormData, photoSchema } from "../schema/new-photo-schema";

// Internal dependencies - Hooks & Store
import { useForm } from "react-hook-form";
import useNewPhotoSheet from "../store/use-new-photo-sheet";
import { ImageUpload } from "../../r2/components/image-upload";
import { useState } from "react";
import type { ExifData, ImageInfo } from "../utils";
import { useNewPhoto } from "../api/use-new-photo";

const NewPhotoForm = () => {
  const { onClose } = useNewPhotoSheet();
  const [exif, setExif] = useState<ExifData | null>(null);
  const [imageInfo, setImageInfo] = useState<ImageInfo>();
  const newPhoto = useNewPhoto();

  // Initialize form with default values
  const form = useForm<PhotoFormData>({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
    },
  });

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
      gapLatitude: exif?.gapLatitude,
      gapLongitude: exif?.gapLongitude,
      gpsAltitude: exif?.gpsAltitude,
      dateTimeOriginal: exif?.dateTimeOriginal?.toString() ?? null,
    };

    try {
      newPhoto.mutate(data, {
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

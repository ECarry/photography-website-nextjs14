"use client";

// External dependencies
import { useState } from "react";
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
import { FileUpload } from "@/components/ui/file-upload";
import { type ExifData, ImageInfo } from "../utils";

const NewPhotoForm = () => {
  const { onClose } = useNewPhotoSheet();
  const [exifData, setExifData] = useState<ExifData | null>(null);

  // Initialize form with default values
  const form = useForm<PhotoFormData>({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      url: "",
    },
  });

  /**
   * Handles file url from FileUpload component
   */
  const handleFileUrl = (data: {
    url: string;
    imageInfo?: ImageInfo;
    exif?: ExifData;
  }) => {
    setExifData(null);
    if (data.url) {
      form.setValue("url", data.url);
    }

    if (data.imageInfo) {
      console.log({
        imageInfo: data.imageInfo,
      });
    }

    if (data.exif) {
      setExifData(data.exif);
      console.log({
        exif: data.exif,
      });
    }
  };

  /**
   * Handles form submission
   * @param {PhotoFormData} values - Form data to be submitted
   */
  const onSubmit = (values: PhotoFormData) => {
    console.log(values);
    try {
      onCloseSheet();
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
                <FileUpload value={field.value} onChange={handleFileUrl} />
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
                <Input {...field} />
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
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="text-white w-full">
          Submit
        </Button>
      </form>
      {exifData && <pre>{JSON.stringify(exifData, null, 2)}</pre>}
    </Form>
  );
};

export default NewPhotoForm;

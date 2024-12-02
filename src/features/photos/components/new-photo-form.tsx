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
import { ImageUpload } from "./image-upload";

const NewPhotoForm = () => {
  const { onClose } = useNewPhotoSheet();

  // Initialize form with default values
  const form = useForm<PhotoFormData>({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
      isFavorite: false,
    },
  });

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
                <ImageUpload value={field.value} />
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

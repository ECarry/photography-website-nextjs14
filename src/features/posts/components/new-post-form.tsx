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
import { Loader2, Check, X } from "lucide-react";

// Internal dependencies - Types & Schema
import { PostFormData, postSchema } from "../schema/new-post-schema";

// Internal dependencies - Hooks & Store
import { useForm } from "react-hook-form";
import useNewPostSheet from "../store/use-new-post-sheet";
import { useCreatePost } from "../api/use-create-post";
import { useEffect } from "react";
import { useCheckSlug } from "../api/use-check-slug";
import { cn } from "@/lib/utils";
import PostCoverUpload from "@/features/r2/components/post-cover-upload";

const NewPostForm = () => {
  const { onClose } = useNewPostSheet();

  const { mutate: createPost, isPending: isCreating } = useCreatePost();

  // Initialize form with default values
  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      slug: "",
      coverImage: "",
    },
  });

  // Watch the title field
  const title = form.watch("title");
  const slug = form.watch("slug");

  // Check if slug already exists
  const { data: slugExists, isPending: isSlugPending } = useCheckSlug(slug);

  const isDisabled = isCreating;

  // Generate slug from title
  useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
        .replace(/-+$/, ""); // Remove trailing hyphen
      form.setValue("slug", slug);
    }
  }, [title, form]);

  /**
   * Handles form submission
   * @param {PostFormData} values - Form data to be submitted
   */
  const onSubmit = (values: PostFormData) => {
    console.log(values);

    try {
      createPost(values, {
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
        <FormField
          disabled={isDisabled}
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter post title" autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    disabled
                    {...field}
                    className={cn(
                      slugExists?.exists
                        ? "text-destructive border-destructive"
                        : "text-muted-foreground"
                    )}
                  />
                  {field.value && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isSlugPending ? (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      ) : slugExists?.exists ? (
                        <X className="h-4 w-4 text-destructive" />
                      ) : (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  )}
                </div>
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
                  placeholder="Enter post description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Cover</FormLabel>
              <FormControl>
                <PostCoverUpload value={value} onChange={onChange} />
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
          <Button disabled={isDisabled || slugExists?.exists} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewPostForm;

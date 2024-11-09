"use client";

import { ExifData, ExifParserFactory } from "ts-exif-parser";
import { imageToBuffer } from "@/lib/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { useState } from "react";
import Image from "next/image";
import { insertPhotoSchema } from "@/db/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePhoto } from "@/features/photos/api/use-create-photo";
import { formatExif } from "@/lib/format-exif";
import { cn } from "@/lib/utils";
import { getImageBlur } from "@/actions/photos";
import { toast } from "sonner";
import { getImageDimensionsFromFile } from "@/lib/get-image-size";
import { useModal } from "@/hooks/use-modal";
import { getReverseGeocoding } from "@/lib/map";
import { Icons } from "../icons";

type UploadData = {
  key: string;
  url: string;
  name: string;
  size: number;
};

const FormSchema = insertPhotoSchema.pick({
  title: true,
  description: true,
});

const CreatePhotoModal = () => {
  const [exif, setExif] = useState<ExifData>();
  const [res, setRes] = useState<UploadData | null>();
  const [size, setSize] = useState<{ width: number; height: number }>();
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState<
    "Waiting for update photo" | "Generate blur data" | "Creating" | "Retry"
  >("Waiting for update photo");

  const { isOpen, onClose } = useModal();

  const mutation = useCreatePhoto();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleImageUpload = async (file: File) => {
    const buffer = await imageToBuffer(file);

    const data = ExifParserFactory.create(buffer as Buffer).parse();

    if (!data.imageSize) {
      const size = await getImageDimensionsFromFile(file);
      setSize(size);
    }

    setExif(data);
  };

  const handleClose = () => {
    setRes(null);
    onClose();
  };

  const handSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsReady(false);

    if (!res?.url) {
      toast.error("Please upload a photo");
      return;
    }
    const exifData = formatExif(exif);
    if (!exif?.imageSize && !size) return;

    const address = await getReverseGeocoding(
      exifData?.longitude,
      exifData?.latitude
    );

    const { width, height } = exif?.imageSize ||
      size || { width: 200, height: 200 };
    const aspectRatio = width / height;

    const blur = await getImageBlur(res?.url);

    if (!blur) {
      toast.error("Generated blur data fail");
      console.log("Generated blur data fail");
      setStatus("Retry");
      setIsReady(true);
      return;
    }

    setStatus("Creating");

    const data = {
      url: res.url,
      blurData: blur,
      width,
      height,
      locationName: address,
      aspectRatio,
      ...exifData,
      ...values,
    };

    mutation.mutate(data, {
      onSuccess: () => {
        handleClose();
        setRes(null);
        form.reset();
        setStatus("Waiting for update photo");
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload photo</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {res ? (
          <div className="relative w-full h-[300px] bg-muted">
            <Image
              src={res.url}
              alt={res.name}
              width={200}
              height={200}
              className={cn(
                "object-cover duration-700 ease-in-out w-full h-full",
                !res.url
                  ? "grayscale blur-xl scale-110"
                  : "grayscale-0 blur-0 scale-100"
              )}
            />
            <button
              disabled={!isReady}
              onClick={() => setRes(null)}
              className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
              type="button"
            >
              <Icons.x className="size-4" />
            </button>
          </div>
        ) : (
          <UploadDropzone
            className="ut-button:bg-sky-500 ut-button:ut-uploading:after:bg-sky-600 ut-label:text-sky-500"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setRes(res[0]);
              toast.success("Photo uploaded!");
              setIsReady(true);
              setStatus("Generate blur data");
            }}
            onUploadError={(error: Error) => {
              console.log(`ERROR! ${error.message}`);
              toast.error(error.message);
            }}
            onBeforeUploadBegin={(files) => {
              return files.map((file) => {
                handleImageUpload(file);

                return file;
              });
            }}
          />
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="title"
              disabled={!isReady}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input disabled={false} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              disabled={!isReady}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea disabled={false} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-center">
              {!res?.url ? (
                <p className={cn("text-xs text-muted-foreground")}>
                  <Icons.loader className="inline-block mr-2 animate-spin size-2" />
                  Photo upload
                </p>
              ) : (
                <p className={cn("text-xs text-green-500")}>
                  <Icons.check className="inline-block mr-2 size-2" />
                  Photo upload
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={!isReady}
            >
              {status}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePhotoModal;

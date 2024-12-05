"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useMap } from "react-map-gl";
import { InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Blurhash } from "react-blurhash";
import { cn } from "@/lib/utils";

// hooks
import { useConfirm } from "@/hooks/use-confirm";
import { useDeletePhoto } from "@/features/photos/api/use-delete-photo";
import { useDeletePhoto as useDeleteR2File } from "@/features/r2/api/use-delete-photo";
import { toast } from "sonner";

export type Photo = InferResponseType<
  typeof client.api.photos.$get,
  200
>["data"][0];

const PhotoCard = ({ photo }: { photo: Photo }) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this photo. This action cannot be undone."
  );

  const removeMutation = useDeletePhoto();
  const removeR2Mutation = useDeleteR2File();

  const { photosMap } = useMap();

  const handlePhotoClick = () => {
    if (photo.gpsLongitude && photo.gpsLatitude) {
      photosMap?.flyTo({
        center: [photo.gpsLongitude, photo.gpsLatitude],
        zoom: 17,
      });
    }
  };

  const onDelete = async () => {
    const filename = photo.url.split("/").pop();
    if (!filename) {
      toast.error("Filename not found");
      return;
    }

    const ok = await confirm();

    if (ok) {
      removeMutation.mutate({ id: photo.id });
      removeR2Mutation.mutate({ filename });
    }
  };

  return (
    <div className="relative">
      <ConfirmDialog />
      <AspectRatio
        ratio={4 / 5}
        className="bg-muted rounded-xl overflow-hidden"
      >
        <div className="absolute inset-0 z-10">
          <Blurhash
            hash={photo.blurData}
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
            className={cn(
              "w-full h-full transition-opacity duration-300",
              isLoaded ? "opacity-0" : "opacity-100"
            )}
          />
        </div>
        <Image
          src={photo.url}
          fill
          alt="Image"
          className={cn(
            "object-cover brightness-100 hover:brightness-110 transition-all duration-300 cursor-pointer z-20",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onClick={handlePhotoClick}
          onLoadingComplete={() => setIsLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </AspectRatio>
      <Button
        variant="outline"
        size="icon"
        className="backdrop-blur-sm bg-black/10 hover:bg-black/40 transition-all duration-150 border-0 rounded-full absolute top-4 right-4 size-12"
        onClick={() => {}}
      >
        {photo.isFavorite ? (
          <Icons.heart
            size={22}
            className="text-muted-foreground fill-rose-500 text-rose-500"
          />
        ) : (
          <Icons.heart size={22} className="text-muted-foreground text-white" />
        )}
      </Button>

      <div className="absolute bottom-0 left-0 w-full h-1/2 z-20">
        <div className="w-full space-y-6 overflow-hidden p-4 transition duration-300 inset-x-0 bottom-0 h-full bg-gradient-to-t from-black to-black/0 flex flex-col justify-end">
          <div className="space-y-2">
            <h1 className="line-clamp-1 text-white text-lg">{photo.title}</h1>
            <div className="flex justify-between">
              <h3 className="text-xs text-white/70">
                {photo.dateTimeOriginal}
              </h3>
              <p className="text-[10px] text-white/70 flex items-center font-light">
                <Icons.mapPin size={12} className="text-sky-500 mr-2" />
                {/* {formatGPSCoordinates(photo.gpsLongitude, photo.gpsLatitude)} */}
              </p>
            </div>
          </div>
          <div className="flex w-full gap-x-4 mt-4">
            <Button
              onClick={() => router.push(`/photos/${photo.id}`)}
              size="sm"
              variant="secondary"
              className="w-full"
            >
              Edit
            </Button>

            <Button
              onClick={onDelete}
              size="sm"
              className="w-full backdrop-blur bg-white/10 hover:bg-white/15"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;

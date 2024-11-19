"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useMap } from "react-map-gl";
import { InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { convertToCoordination } from "@/lib/convert-coordination";
import { formatDate } from "@/lib/date";
import Link from "next/link";
import { useEditPhoto } from "@/features/photos/api/use-edit-photo";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { deleteCloudPhoto } from "@/actions/photos";
import { useDeletePhoto } from "@/features/photos/api/use-delete-photo";
import { useConfirm } from "@/hooks/use-confirm";

export type Photo = InferResponseType<
  typeof client.api.photos.$get,
  200
>["data"][0];

const PhotoCard = ({ photo }: { photo: Photo }) => {
  const router = useRouter();
  const { map } = useMap();
  const editMutation = useEditPhoto(photo.id);
  const deleteMutation = useDeletePhoto(photo.id);

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This action cannot be undone."
  );

  const handlePhotoClick = () => {
    if (photo.longitude && photo.latitude) {
      map?.flyTo({ center: [photo.longitude, photo.latitude], zoom: 17 });
    }
  };

  const handleHeartClick = () => {
    editMutation.mutate(
      {
        isFavorite: !photo.isFavorite,
      },
      {
        onSuccess: () => {},
      }
    );
  };

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      await deleteCloudPhoto(photo.url);
      deleteMutation.mutate(undefined, {
        onSuccess: async () => {
          router.push("/photos");
        },
      });
    }
  };

  return (
    <div className="relative">
      <ConfirmDialog />
      <AspectRatio
        ratio={4 / 5}
        className="bg-muted rounded-xl overflow-hidden"
      >
        <Image
          src={photo.url}
          fill
          alt="Image"
          placeholder="blur"
          blurDataURL={photo.blurData}
          className="object-cover brightness-100 hover:brightness-110 transition-all duration-300 cursor-pointer"
          onClick={handlePhotoClick}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </AspectRatio>
      <Button
        variant="outline"
        size="icon"
        className="backdrop-blur-sm bg-black/10 hover:bg-black/40 transition-all duration-150 border-0 rounded-full absolute top-4 right-4 size-12"
        onClick={handleHeartClick}
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

      <div className="absolute bottom-0 left-0 w-full h-1/2">
        <div className="w-full space-y-6 overflow-hidden p-4 transition duration-300 inset-x-0 bottom-0 h-full bg-gradient-to-t from-black to-black/0 flex flex-col justify-end">
          <div className="space-y-2">
            <h1 className="line-clamp-1 text-white text-lg">{photo.title}</h1>
            <div className="flex justify-between">
              <h3 className="text-xs text-white/70">
                {formatDate(photo.takeAt)}
              </h3>
              <p className="text-[10px] text-white/70 flex items-center font-light">
                <Icons.mapPin size={12} className="text-sky-500 mr-2" />
                {convertToCoordination(photo.longitude, photo.latitude)}
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
              onClick={handleDelete}
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

"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Heart, MapPin } from "lucide-react";
import { useMap } from "react-map-gl";
import { InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { convertToCoordination } from "@/lib/convert-coordination";
import { formatDate } from "@/lib/date";
import Link from "next/link";
import { useEditPhoto } from "@/features/photos/api/use-edit-photo";

export type Photo = InferResponseType<
  typeof client.api.photos.$get,
  200
>["data"][0];

const PhotoCard = ({ photo }: { photo: Photo }) => {
  const { map } = useMap();
  const editMutation = useEditPhoto(photo.id);

  const handlePhotoClick = () => {
    if (photo.longitude && photo.latitude) {
      map?.flyTo({ center: [photo.longitude, photo.latitude] });
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

  return (
    <div className="relative">
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
        className="bg-white rounded-full absolute top-2 right-2 size-8"
        onClick={handleHeartClick}
      >
        {photo.isFavorite ? (
          <Heart
            size={18}
            className="text-muted-foreground fill-rose-500 text-rose-500"
          />
        ) : (
          <Heart size={18} className="text-muted-foreground" />
        )}
      </Button>

      <Link href={`/photos/${photo.id}`} className="group">
        <div className="absolute bottom-0 left-0 w-full p-2">
          <div className="w-full space-y-2 rounded-md overflow-hidden p-2 bg-white backdrop-blur supports-[backdrop-filter]:bg-background/75 group-hover:supports-[backdrop-filter]:bg-background/85 transition duration-150">
            <h1 className="line-clamp-1 group-hover:underline">
              {photo.title}
            </h1>
            <h3 className="text-xs text-muted-foreground">
              {formatDate(photo.takeAt)}
            </h3>
            <p className="text-[10px] text-muted-foreground flex items-center font-light">
              <MapPin size={12} className="text-sky-500 mr-2" />
              {convertToCoordination(photo.longitude, photo.latitude)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PhotoCard;

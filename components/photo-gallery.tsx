"use client";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import renderNextImage from "./render-next-image";
import { useGetPhotos } from "@/features/photos/api/use-get-photos";
import { Icons } from "./icons";

export default function PhotoGallery() {
  const photosQuery = useGetPhotos();

  const photos =
    photosQuery.data?.map((photo) => ({
      id: photo.id,
      src: photo.url,
      width: photo.width,
      height: photo.height,
      alt: photo.description,
      blurDataURL: photo.blurData,
    })) ?? [];

  return photosQuery.isPending ? (
    <div className="w-full flex items-center justify-center">
      <Icons.loader className="animate-spin" />
    </div>
  ) : (
    <RowsPhotoAlbum
      photos={photos}
      render={{ image: renderNextImage }}
      defaultContainerWidth={1200}
      spacing={6}
      sizes={{
        size: "1168px",
        sizes: [
          { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
        ],
      }}
    />
  );
}

"use client";

import { useGetPhotos } from "@/features/photos/api/use-get-photos";
import PhotoScreensaver from "@/components/photo-screensaver";

export default function ScreensaverPage() {
  const { data: photos } = useGetPhotos();

  const formattedPhotos = photos?.map(photo => ({
    id: photo.id,
    url: photo.url,
    blurData: photo.blurData,
  })) || [];

  return (
    <div className="fixed inset-0">
      <PhotoScreensaver 
        photos={formattedPhotos}
        className="w-full h-full"
      />
    </div>
  );
}

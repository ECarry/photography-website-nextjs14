"use client";

import { useGetPhotos } from "@/features/photos/api/use-get-photos";

const PhotoPage = () => {
  const photos = useGetPhotos();

  return <div>{JSON.stringify(photos.data, null, 2)}</div>;
};

export default PhotoPage;

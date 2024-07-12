"use client";

import Image from "next/image";
import { useGetPhoto } from "@/features/photos/api/use-get-photo";
import { Loader2 } from "lucide-react";

interface PhotoPageProps {
  params: {
    id: string;
  };
}

const PhotoPage = ({ params }: PhotoPageProps) => {
  const photoQuery = useGetPhoto(params.id);

  const photo = photoQuery.data;

  if (!photo) {
    return (
      <div className="w-full h-dvh flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <section className="max-h-dvh max-w-full overflow-hidden ml-0 md:ml-[280px] relative flex items-center justify-center h-full p-10">
      <Image
        src={photo?.url}
        alt={photo.title}
        width={photo.width}
        height={photo.height}
        placeholder="blur"
        blurDataURL={photo.blurData}
        className="z-10 w-auto max-h-[800px]"
      />
      <div className="blur-2xl md:left-[280px] fixed inset-0">
        <Image
          src={photo?.url}
          alt={photo.title}
          width={photo.width}
          height={photo.height}
          placeholder="blur"
          blurDataURL={photo.blurData}
          className="max-h-dvh w-auto object-cover"
        />
      </div>
    </section>
  );
};

export default PhotoPage;

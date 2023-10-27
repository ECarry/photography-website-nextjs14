import { db } from "@/lib/db";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

interface AlbumIdPageGalleryProps {
  albumId: string;
}

const AlbumIdPageGallery = async ({
  albumId
}: AlbumIdPageGalleryProps) => {
  if (!albumId) {
    return null
  }

  const album = await db.album.findFirst({
    where: {
      id: albumId
    },
    include: {
      photos: true
    }
  })

  if (!album) {
    return null
  }

  const photos = album.photos

  if (!photos) {
    return null
  }

  return (
    <div 
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-4
      "
    >
      {photos.map(photo => (
        <div key={photo.id}>
          <AspectRatio ratio={1} className="bg-muted rounded-xl overflow-hidden">
            <Image 
              src={photo.imageUrl} 
              alt=""
              fill
              className="object-cover cursor-pointer hover:scale-105 transition"
            />
          </AspectRatio>
        </div>
      ))}
    </div>
  )
}

export default AlbumIdPageGallery

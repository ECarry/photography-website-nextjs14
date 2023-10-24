import { Album, Photo } from "@prisma/client"

import PhotoCard from "./PhotoCard"
import { db } from "@/lib/db"

interface PhotoGalleryProps {
  type: 'photos' | 'albums'
}

const PhotoGallery = async ({
  type
}: PhotoGalleryProps) => {

  let items: (Photo | Album)[] = [];

  if (type === 'photos') {
    items = await db.photo.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  } else if (type === 'albums') {
    items = await db.album.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  return (
    <div 
      className="
        grid 
        grid-cols-1 
        gap-y-10 
        gap-x-2
        sm:grid-cols-2
        lg:grid-cols-3
        xl:gap-x-4
      ">
      {items.map(item => (
        <PhotoCard 
          key={item.id} 
          title={item.title}
          id={item.id}
          description={item.description}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  )
}

export default PhotoGallery

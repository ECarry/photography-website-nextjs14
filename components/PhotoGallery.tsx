import { Photo } from "@prisma/client"

import PhotoCard from "./PhotoCard"
import { db } from "@/lib/db"

const PhotoGallery = async () => {

  const photos = await db.photo.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (!photos) {
    return (
      <div>
        There have no photos!
      </div>
    )
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
      {photos.map((photo: Photo) => (
        <PhotoCard 
          key={photo.id} 
          title={photo.title}
          id={photo.id}
          description={photo.description}
          imageUrl={photo.imageUrl}
          isFavorited={photo.isFavorited}
        />
      ))}
    </div>
  )
}

export default PhotoGallery

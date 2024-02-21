import { fetchECarryPhotos } from "@/data/photo"

import PhotoCard from "./PhotoCard"

const PhotoGallery = async () => {
  const photos = await fetchECarryPhotos(1, 100)

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
      {photos.map(photo => (
        <PhotoCard 
          key={photo.id} 
          title={photo.title}
          id={photo.id}
          description={photo.description}
          imageUrl={photo.imageUrl}
        />
      ))}
    </div>
  )
}

export default PhotoGallery
 
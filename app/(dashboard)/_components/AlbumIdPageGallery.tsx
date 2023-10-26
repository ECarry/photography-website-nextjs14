import { db } from "@/lib/db";

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

  const photos = album?.photos

  return (
    <div 
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
      "
    >
      {photos?.map(photo => (
        <div key={photo.id}>
          <img src={photo.imageUrl} />
        </div>
      ))}
    </div>
  )
}

export default AlbumIdPageGallery

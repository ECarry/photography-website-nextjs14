import React from 'react'
import PhotoLink from './photo-link'
import { Photo } from '@prisma/client'

const getPreviousPhoto = (photo: Photo, photos: Photo[]) => {
  const index = photos.findIndex(p => p.id === photo.id);
  return index > 0
    ? photos[index - 1]
    : undefined;
};

const getNextPhoto = (photo: Photo, photos: Photo[]) => {
  const index = photos.findIndex(p => p.id === photo.id);
  return index < photos.length - 1
    ? photos[index + 1]
    : undefined;
};

const PhotoLinks = ({
  photo,
  photos
}: {
  photo: Photo;
  photos: Photo[]
}) => {

  const previousPhoto = getPreviousPhoto(photo, photos);
  const nextPhoto = getNextPhoto(photo, photos);

  return (
    <div className="text-xs flex gap-1">
      <PhotoLink
        photo={previousPhoto}
        prefetch
      >
        PREV
      </PhotoLink>
      <span className="text-[#aaa] cursor-default">/</span>
      <PhotoLink
        photo={nextPhoto}
        prefetch
      >
        NEXT
      </PhotoLink>
  </div>
  )
}

export default PhotoLinks

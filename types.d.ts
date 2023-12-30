import { Album } from '@prisma/client'

interface AlbumWithPhotos extends Album {
  photos: []
}

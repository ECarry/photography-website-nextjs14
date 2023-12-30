import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Album } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

interface AlbumCardProps {
  album: Album
}

const AlbumCard = ({
  album
}: AlbumCardProps) => {
  return (
    <div>
      <AspectRatio ratio={8 / 5} className="bg-muted">
        <Image 
          src={album.imageUrl}
          alt='album'
          fill
        />
      </AspectRatio>
    </div>
  )
}

export default AlbumCard

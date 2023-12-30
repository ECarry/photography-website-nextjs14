import { AspectRatio } from '@/components/ui/aspect-ratio'
import { AlbumWithPhotos } from '@/types'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface AlbumCardProps {
  album: AlbumWithPhotos
}

const AlbumCard = ({
  album
}: AlbumCardProps) => {

  return (
    <Link href={`/albums/${album.id}`} className='relative'>
      <AspectRatio ratio={8 / 5} className="bg-muted">
        <Image 
          src={album.imageUrl}
          alt='album'
          fill
          className='hover:brightness-110 transition-all duration-150'
        />
        
      </AspectRatio>
      <div 
        className='
          flex 
          gap-1 
          items-center 
          text-white 
          px-1 
          py-[1px] 
          rounded-sm 
          absolute 
          top-4
          right-4
          md:top-2
          md:right-2
          backdrop-blur 
          supports-[backdrop-filter]:bg-background/10'>
        <ImageIcon size={12} className='' />
        <span className='text-xs'>{album.photos.length}</span>
      </div>
    </Link>
  )
}

export default AlbumCard

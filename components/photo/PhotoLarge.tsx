import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Photo } from '@prisma/client'
import formatCustomDate from '@/lib/formatCustomDate'

import SiteGrid from '@/components/SiteGrid'
import ImageLarge from '@/components/ImageLarge'
import convertCoordinates from '@/lib/convertCoordinateToPoint'

const PhotoLarge =
({
  photo,
  priority
}: {
  photo: Photo
  priority?: boolean
}) => {

  const renderMiniGrid = (children: JSX.Element) =>
    <div className={cn(
      'flex gap-y-4',
      'flex-col sm:flex-row lg:flex-col',
      '[&>*]:sm:flex-grow',
      'pr-2',
    )}>
      {children}
    </div>;

  return (
    <SiteGrid
      contentMain={
        <ImageLarge
          className="w-full max-h-[80vh] object-contain"
          alt={photo.title}
          src={photo.imageUrl}
          aspectRatio={photo.aspectRatio}
          priority={priority}
          id={photo.id}
        />}
      contentSide={
        <div className={cn(
          'sticky top-4 self-start text-sm',
          'grid grid-cols-2 lg:grid-cols-1',
          'gap-y-4',
          '-translate-y-1',
          'mb-4',
        )}>
          {renderMiniGrid(<>
            {/* TITLT  */}
            <Link
              href={`/p/${photo.id}`}
              className="font-bold uppercase"
            >
              {photo.title}
            </Link>
            {/* CARMRA  */}
            <div className="uppercase">
              {photo.cameraMake} {photo.cameraModel}
            </div>
          </>)}
          {renderMiniGrid(<>
            <ul className={cn(
              'text-gray-500',
              'dark:text-gray-400',
            )}>
              <li>
                {photo.focalLength}
                {' '}
                <span className={cn(
                  'text-gray-400/80',
                  'dark:text-gray-400/50',
                )}>
                  {photo.focalLengthIn35mmFilm}
                </span>
              </li>
              <li>{photo.fNumber}</li>
              <li>{photo.iso}</li>
              <li>{photo.shutterSpeed}</li>
              <li className='hidden lg:block'>{photo.latitude && photo.longitude ? convertCoordinates(photo.latitude, photo.longitude) : '-'}</li>
              { photo.gpsAltitude ? 
              <li className='hidden lg:block'>{photo.gpsAltitude}</li>
              : null
              }
            </ul>
            <div className={cn(
              'flex gap-y-4',
              'flex-col sm:flex-row lg:flex-col',
            )}>
              <div className={cn(
                'grow uppercase',
                'text-gray-500',
                'dark:text-gray-400',
              )}>
                {photo.timestamp ? formatCustomDate(photo.timestamp) : '-'}
              </div>
            </div>
          </>)}
        </div>}
    />
  )
}

export default PhotoLarge

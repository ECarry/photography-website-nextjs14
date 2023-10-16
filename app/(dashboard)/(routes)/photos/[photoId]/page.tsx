import Image from "next/image";
import { db } from "@/lib/db";
import type { Metadata, ResolvingMetadata } from 'next'

import DeleteAction from "@/app/(dashboard)/_components/DeleteAction";
import FavoriteAction from "@/app/(dashboard)/_components/FavoriteAction";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import convertCoordinates from "@/lib/convertCoordinateToPoint";
import { Separator } from "@/components/ui/separator";
import formatCustomDate from "@/lib/formatCustomDate";
import { Heart } from "lucide-react";
import EditPhotoForm from "@/app/(dashboard)/_components/EditPhotoForm";
import Mapbox from "@/app/(dashboard)/_components/Mapbox";

interface PhotoIdPageProps {
  params: {
    photoId: string;
  }
}

export async function generateMetadata(
  { params }: PhotoIdPageProps
): Promise<Metadata> {
  const { photoId } = params

  const photo = await db.photo.findFirst({
    where: {
      id: photoId
    }
  })

  return {
    title: `Edit ${photo?.title}`
  }
}

const PhotoIdPage = async ({
  params
}: PhotoIdPageProps) => {
  const { photoId } = params

  if (!photoId) {
    return null
  }

  const photo = await db.photo.findFirst({
    where: {
      id: photoId
    }
  })

  if (!photo) {
    return (
      <h1>Photo {photoId} not found</h1>
    )
  }

  return (
    <div 
      className="
        grid
        grid-cols-1
        lg:grid-cols-12
        gap-4
        pb-4
    ">

      <div className="col-span-1 lg:col-span-8 flex flex-col gap-8">
        {/* IMAGE  */}
        <div className="p-4 bg-[#f5f5f5] rounded-[26px]">
          <AspectRatio ratio={photo.aspectRatio > 1 ? 16 / 9 : 9 / 16} className="bg-muted">
            <Image
              src={photo.imageUrl}
              alt={photo.title}
              fill
              className="rounded-[10px] object-cover overflow-hidden"
            />
          </AspectRatio>
        </div>
        {/* TITLE  */}
        <div>
          <div className="flex justify-between">
            <h1 className="text-4xl">
              {photo.title}
            </h1>
            <div className="flex items-center">
              <div className="p-2 rounded-full cursor-pointer hover:bg-[#f5f5f5] flex justify-center items-center">
                <DeleteAction id={photo.id} title={photo.title} />
              </div>

              <div className="p-2 rounded-full cursor-pointer hover:bg-[#f5f5f5] flex justify-center items-center">
                <Heart className="text-rose-500" />
              </div>
            </div>
          </div>

          <div className="flex">
            <p>{photo.timestamp ? formatCustomDate(photo.timestamp) : '-'}</p>
          </div>
        </div>
        {/* CAMERA  */}
        <div className="border rounded-[10px] flex flex-col overflow-hidden">
          <div className="bg-[#f5f5f5] py-2 px-4">
            <h1 className="text-lg">{photo.cameraMake} {photo.cameraModel}</h1>
          </div>

          <div className="py-2 px-4">
            <p className="text-sm">{photo.cameraLens}</p>
            <p className="text-gray-500 text-sm">{photo.latitude && photo.longitude ? convertCoordinates(photo.latitude, photo.longitude) : '-'} {photo.gpsAltitude}</p>
          </div>

          <Separator />

          <div className="flex w-full justify-between items-center text-sm p-4">
            <div>{photo.iso}</div>
            <Separator orientation="vertical" />
            <div>{photo.focalLength} <span className="text-gray-400/80">{photo.focalLengthIn35mmFilm}</span></div>
            <Separator orientation="vertical" />
            <div>{photo.fNumber}</div>
            <Separator orientation="vertical" />
            <div>{photo.shutterSpeed}</div>
          </div>
        </div>

        {/* DESCRIPTION  */}
        <div>
          <h1 className="text-3xl mb-2">Description</h1>
          <p className="text-sm text-gray-400">{photo.description}</p>
        </div>

        {/* MAP  */}
        <div>
          <h1 className="text-3xl mb-2">Map</h1>
          <p className="mb-2 text-sm text-gray-300">Click map to update coordinate</p>
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-[10px] overflow-hidden">
            <Mapbox
              longitude={photo.longitude}
              latitude={photo.latitude}
              photoId={photoId}
            />
          </AspectRatio>
        </div>
      </div>

      <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-4 lg:self-start bg-[#f5f5f5] rounded-[10px] p-4">
        <EditPhotoForm photo={photo} />
      </div>
    </div>
  )
}

export default PhotoIdPage

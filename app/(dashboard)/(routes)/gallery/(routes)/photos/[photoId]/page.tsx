import Image from "next/image";
import type { Metadata } from 'next'

import DeleteAction from "@/app/(dashboard)/_components/DeleteAction";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import convertCoordinates from "@/lib/convertCoordinateToPoint";
import { Separator } from "@/components/ui/separator";
import formatCustomDate from "@/lib/formatCustomDate";
import { Heart } from "lucide-react";
import EditPhotoForm from "@/app/(dashboard)/_components/EditPhotoForm";
import Mapbox from "@/app/(dashboard)/_components/Mapbox";
import { fetchPhotoInfo } from "@/lib/data";

interface PhotoIdPageProps {
  params: {
    photoId: string;
  }
}

export async function generateMetadata(
  { params }: PhotoIdPageProps
): Promise<Metadata> {
  const { photoId } = params

  const photo = await fetchPhotoInfo(photoId)
  
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

  const photo = await fetchPhotoInfo(photoId)

  if (!photo) {
    return (
      <h1>Photo {photoId} not found</h1>
    )
  }

  const aspectRatioMap = (value: number) => {
    switch (true) {
      case value >= 0.9 && value <= 1.1:
        return 1;
      case value < 0.9:
        return 9/16;
      default:
        return 16/9;
    }
  }

  return (
    <div 
      className="
        grid
        grid-cols-1
        lg:grid-cols-12
        gap-4
        pb-4
        lg:pb-8
    ">

      <div className="col-span-1 lg:col-span-8 flex flex-col gap-8">
        {/* IMAGE  */}
        <AspectRatio ratio={aspectRatioMap(photo.aspectRatio)} className="bg-muted rounded-[5px] md:rounded-[10px] overflow-hidden">
          <Image
            src={photo.imageUrl}
            alt={photo.title}
            fill
            className="object-cover"
          />
        </AspectRatio>
        {/* TITLE  */}
        <div>
          <div className="flex justify-between">
            <h1 className="text-2xl md:text-4xl">
              {photo.title}
            </h1>
            <div className="flex items-center">
              <div className="p-2 rounded-full cursor-pointer hover:bg-[#f5f5f5] flex justify-center items-center">
                <DeleteAction id={photo.id} title={photo.title} type="photos" />
              </div>

              <div className="p-2 rounded-full cursor-pointer hover:bg-[#f5f5f5] flex justify-center items-center">
                <Heart className="text-rose-500" />
              </div>
            </div>
          </div>

          <div className="flex">
            <p className="text-muted-foreground text-sm md:text-lg">{photo.timestamp ? formatCustomDate(photo.timestamp) : '-'}</p>
          </div>
        </div>

        {/* CAMERA  */}
        <div className="border rounded-[10px] flex flex-col overflow-hidden">
          <div className="bg-[#f5f5f5] dark:bg-black py-2 px-4">
            <h1 className="md:text-lg">{photo.cameraMake} {photo.cameraModel}</h1>
          </div>

          <div className="py-2 px-4">
            <p className="text-xs md:text-sm">{photo.cameraLens}</p>
            <p className="text-muted-foreground text-xs md:text-sm">{photo.latitude && photo.longitude ? convertCoordinates(photo.latitude, photo.longitude) : '-'} {photo.gpsAltitude}</p>
          </div>

          <Separator />

          <div className="flex w-full justify-between items-center text-xs md:text-sm p-4">
            <div>{photo.iso}</div>
            <Separator orientation="vertical" />
            <div>{photo.focalLength} <span className="text-muted-foreground">{photo.focalLengthIn35mmFilm}</span></div>
            <Separator orientation="vertical" />
            <div>{photo.fNumber}</div>
            <Separator orientation="vertical" />
            <div>{photo.shutterSpeed}</div>
          </div>
        </div>

        {/* DESCRIPTION  */}
        <div>
          <h1 className="text-xl md:text-3xl mb-2">Description</h1>
          <p className="text-xs md:text-sm text-muted-foreground">{photo.description}</p>
        </div>

        {/* MAP  */}
        <div>
          <h1 className="text-xl md:text-3xl mb-2">Map</h1>
          <p className="mb-2 text-xs md:text-sm text-muted-foreground">Double-click map to update coordinate</p>
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-[10px] overflow-hidden">
            <Mapbox
              longitude={photo.longitude}
              latitude={photo.latitude}
              photoId={photoId}
            />
          </AspectRatio>
        </div>
      </div>

      <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-14 lg:self-start bg-[#f5f5f5] dark:bg-black rounded-[10px] p-4">
        <EditPhotoForm photo={photo} />
      </div>
    </div>
  )
}

export default PhotoIdPage

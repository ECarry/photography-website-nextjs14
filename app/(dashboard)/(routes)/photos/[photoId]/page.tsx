import Image from "next/image";
import { db } from "@/lib/db";

import DeleteAction from "@/app/(dashboard)/_components/DeleteAction";
import FavoriteAction from "@/app/(dashboard)/_components/FavoriteAction";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import convertCoordinates from "@/lib/convertCoordinateToPoint";

interface PhotoIdPageProps {
  params: {
    photoId: string;
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
        md:grid-cols-12
    ">

      <div className="col-span-1 md:col-span-8 flex flex-col gap-6">

        <div className="p-5 bg-[#f5f5f5] rounded-[30px]">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={photo.imageUrl}
              alt={photo.title}
              fill
              className="rounded-[10px] object-cover overflow-hidden"
            />
          </AspectRatio>
        </div>

        <div>
          <div className="flex justify-between">
            <h1 className="text-4xl">
              {photo.title}
            </h1>
            <div>
              <div className="p-2 rounded-full hover:bg-[#f5f5f5] flex justify-center items-center">
                <DeleteAction id={photo.id} title={photo.title} />
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-500">{photo.latitude && photo.longitude ? convertCoordinates(photo.latitude, photo.longitude) : '-'}</p>
          </div>
        </div>
        
      </div>

      <div className="col-span-1 md:col-span-4 bg-green-200 md:sticky md:top-0 md:self-start">
        desc
      </div>
    </div>
  )
}

export default PhotoIdPage

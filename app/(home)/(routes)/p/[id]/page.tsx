import Link from "next/link"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { fetchAllECarryPhotos, fetchPhotoInfo } from "@/lib/data"

import PhotoLinks from "@/app/(home)/_components/photo-links"
import ImageRevealEffect from "@/components/image-reveal-effect"

interface PhotoIdPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata(
  { params }: PhotoIdPageProps
): Promise<Metadata> {
  const { id } = params

  const photo = await fetchPhotoInfo(id)
  
  return {
    title: `${photo?.title}`
  }
}

const PhotoIdPage = async ({
  params
}: PhotoIdPageProps) => {
  const { id } = params

  const photos = await fetchAllECarryPhotos()

  const photo = photos.find(p => p.id === id);

  if (!photo) { redirect('/'); }

  return (
    <div className='flex items-center justify-center text-3xl h-screen ml-[280px] py-[40px] pr-[50px] overflow-hidden'>
      <ImageRevealEffect photo={photo} />

      <div className="absolute left-[50px] bottom-[50px] w-[180px]">
        <div className="mb-[10px] text-sm">
          <h1 className="font-bold mb-[10px]">{photo.title}</h1>
          <p className="text-xs text-[#666] text-justify">{photo.description}</p>
        </div>

        <PhotoLinks photo={photo} photos={photos} />

        <Link href='/grid' className="uppercase text-xs text-[#666666]">show thumbnails</Link>
      </div>
    </div>
  )
}

export default PhotoIdPage

import { fetchPhotoInfo } from "@/lib/data"
import Image from "next/image"

interface PhotoIdPageProps {
  params: {
    id: string
  }
}

const PhotoIdPage = async ({
  params
}: PhotoIdPageProps) => {
  const { id } = params

  const data = await fetchPhotoInfo(id)
  
  if (!data) {
    return null
  }

  return (
    <div className='flex items-center justify-center text-3xl h-screen ml-[280px] py-[50px] pr-[50px] overflow-hidden'>
      <Image 
        src={data.imageUrl}
        alt="image"
        width={data.width}
        height={data.width}
        className="max-h-full max-w-full object-contain h-full w-full" 
      />
    </div>
  )
}

export default PhotoIdPage

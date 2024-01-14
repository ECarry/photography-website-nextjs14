import { AspectRatio } from "@/components/ui/aspect-ratio"
import { fetchPhotoInfo } from "@/lib/data"
import { cn } from "@/lib/utils"
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

  console.log(data);
  

  return (
    <div className='flex items-center justify-center text-3xl'>
        <AspectRatio ratio={data.aspectRatio} className={cn('')}>
          <Image 
            src={data.imageUrl}
            alt="image"
            fill
          />
         </AspectRatio>

    </div>
  )
}

export default PhotoIdPage

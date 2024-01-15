import { fetchPhotoInfo } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

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
    <div className='flex items-center justify-center text-3xl h-screen ml-[280px] py-[40px] pr-[50px] overflow-hidden'>
      <Image 
        src={data.imageUrl}
        alt="image"
        width={data.width}
        height={data.width}
        className="max-h-full max-w-full object-contain h-full w-full" 
      />

      <div className="absolute left-[50px] bottom-[50px] w-[180px]">
        <div className="mb-[10px] text-sm">
          <h1 className="font-bold mb-[10px]">{data.title}</h1>
          <p className="text-left">{data.description}</p>
        </div>
        <div className="text-xs flex gap-1">
          <span className="text-[#222]">PREV</span>
          <span className="text-[#aaa]">/</span>
          <span className="text-[#222]">NEXT</span>
        </div>

        <Link href='/grid' className="uppercase text-xs text-[#666666]">show thumbnails</Link>
      </div>
    </div>
  )
}

export default PhotoIdPage

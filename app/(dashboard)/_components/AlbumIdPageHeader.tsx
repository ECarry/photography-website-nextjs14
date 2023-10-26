import Image from "next/image";
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface AlbumIdPageHeaderProps {
  imageUrl: string;
  title: string;
  description: string;
}

const AlbumIdPageHeader = ({
  imageUrl,
  title,
  description
}: AlbumIdPageHeaderProps) => {
  return (
    <div 
    className="
      grid
      grid-cols-1
      md:grid-cols-12
      gap-2
      md:gap-4
  ">

    <div className="col-span-1 md:col-span-8">
      <AspectRatio ratio={16 / 10} >
        <Image 
          src={imageUrl}
          alt="album"
          fill
          className="object-cover"
        />
      </AspectRatio>
    </div>

    <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
      <h1 className="text-primary text-center md:text-left text-lg md:text-xl">{title}</h1>
      <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
        {description}
      </p>
    </div>
  </div>
  )
}

export default AlbumIdPageHeader

'use client'

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Edit, Heart } from "lucide-react";
import { Button } from "./ui/button";
import DeleteAction from "@/app/(dashboard)/_components/DeleteAction";
import FavoriteAction from "@/app/(dashboard)/_components/FavoriteAction";
import { useRouter } from "next/navigation";

interface PhotoCardProps {
  title: string;
  id: string;
  description: string | null;
  imageUrl: string;
  isFavorited: boolean;
}

const PhotoCard = ({
  title,
  id,
  description,
  imageUrl,
  isFavorited
}: PhotoCardProps) => {
  const [isLoading, setLoading] = useState(true)
  const router = useRouter()

  return (
    <div className="border-gray-200 border rounded-2xl overflow-hidden">
      {/* IMAGE  */}
      <div 
        className="
          aspect-w-16
          aspect-h-10
          w-full
          overflow-hidden
          rounded-2xl
          bg-gray-200
        ">
          <Image 
            src={imageUrl}
            alt="blur"
            fill
            sizes="(min-width: 1280px) 288px, (min-width: 1040px) calc(33.18vw - 25px), (min-width: 640px) calc(50vw - 28px), calc(100vw - 32px)"
            className={cn("rounded-2xl group-hover:opacity-75 object-cover duration-700 ease-in-out",
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100'
            )}
            onLoadingComplete={() => setLoading(false)}
          />
      </div>

      {/* FOOTER  */}
      <div className="p-4 flex justify-between gap-4">

        <div className="flex flex-col gap-6">
          <h1 className="text-2xl md:text-3xl">
            {title}
          </h1>

          <p className="text-gray-400 line-clamp-2 text-sm">
            {description}
          </p>
        </div>

        <div className="flex flex-col items-end justify-between gap-10">
          <div className="flex gap-2">
            <DeleteAction id={id} title={title} />
            <FavoriteAction
              id={id}
              isFavorited={isFavorited}
            />
          </div>

          <div className="flex justify-end">
            <Button variant='primary' onClick={() => router.push(`/photos/${id}/`)}><Edit className="mr-2 w-4 h-4" /> Edit</Button>
          </div>
        </div>
        
      </div>
    </div>
    
  )
}

export default PhotoCard

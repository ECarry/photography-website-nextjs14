'use client'

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Edit, Heart } from "lucide-react";
import { Button } from "./ui/button";
import DeleteAction from "@/app/(dashboard)/_components/DeleteAction";
import ConfettiCannon from "./ConfettiCannon";

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

  return (
    <div className="border-gray-200 border rounded-2xl overflow-hidden">
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

      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-semibold">
            {title}
          </h1>

          <div className="flex gap-2 items-center">
            <DeleteAction id={id} title={title} />
            <ConfettiCannon />
          </div>
        </div>

        <div>
          <p className="text-gray-400 line-clamp-2">
            This is photo descript. This is photo descript. This is photo descript.
          </p>
        </div>

        <div className="flex justify-end">
          <Button variant='primary'><Edit className="mr-2 w-4 h-4" /> Edit</Button>
        </div>
        
      </div>
    </div>
    
  )
}

export default PhotoCard

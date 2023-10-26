import { db } from "@/lib/db";
import { Metadata } from "next";
import Image from "next/image";

import PageHeader from "@/app/(dashboard)/_components/PageHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface AlbumIdPageProps {
  params: {
    albumId: string;
  }
}

export async function generateMetadata(
  { params }: AlbumIdPageProps
): Promise<Metadata> {
  const { albumId } = params

  const album = await db.album.findFirst({
    where: {
      id: albumId
    }
  })

  return {
    title: `Edit ${album?.title} - Dashboard - ECarry Photography`
  }
}

const AlbumIdPage = async ({
  params
}: AlbumIdPageProps) => {
  const album = await db.album.findFirst({
    where: {
      id: params.albumId
    }
  })

  if (!album) {
    return null
  }

  return (
    <div className="flex flex-col gap-4">
      <AspectRatio ratio={16 / 10}>
        <Image 
          src={album?.imageUrl}
          alt="album"
          fill
          className="object-cover"
        />
      </AspectRatio>
      <PageHeader title="糖水日记"  label="Add Photo" type="createPhoto" />
      
      <h1>{album?.title}</h1>
      <h2>{params.albumId}</h2>
      <p>{album?.description}</p>
    </div>
  )
}

export default AlbumIdPage

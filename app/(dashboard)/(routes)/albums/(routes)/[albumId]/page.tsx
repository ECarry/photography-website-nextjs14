import { db } from "@/lib/db";
import { Metadata } from "next";

import PageHeader from "@/app/(dashboard)/_components/PageHeader";
import { Separator } from "@/components/ui/separator";
import AlbumIdPageHeader from "@/app/(dashboard)/_components/AlbumIdPageHeader";
import AlbumIdPageGallery from "@/app/(dashboard)/_components/AlbumIdPageGallery";

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
    title: `${album?.title} - Dashboard - ECarry Photography`
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
      <PageHeader title="糖水日记"  label="Add Photo" type="createPhoto" id={params.albumId} />

      <AlbumIdPageHeader
        imageUrl={album.imageUrl}
        title={album.title}
        description={album.description}
      />

      <Separator />

      <AlbumIdPageGallery albumId={album.id}/>

    </div>
  )
}

export default AlbumIdPage

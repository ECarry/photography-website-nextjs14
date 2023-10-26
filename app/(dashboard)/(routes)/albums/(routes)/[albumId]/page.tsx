import { db } from "@/lib/db";
import { Metadata } from "next";

interface AlbumIdPageProps {
  params: {
    albumId: string;
  }
}

export async function generateMetadata(
  { params }: AlbumIdPageProps
): Promise<Metadata> {
  const { albumId } = params

  const photo = await db.album.findFirst({
    where: {
      id: albumId
    }
  })

  return {
    title: `Edit ${photo?.title} - Dashboard - ECarry Photography`
  }
}

const AlbumIdPage = ({
  params
}: AlbumIdPageProps) => {
  return (
    <div>
      {params.albumId}
    </div>
  )
}

export default AlbumIdPage

import { currentUser } from "@/lib/currentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req:Request) {
  try {
    const user = await currentUser()
    const data = await req.json()

    const { id } = data

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!id) {
      return new NextResponse('Album ID missing', { status: 400 })
    }

    const album = await db.album.findFirst({
      where: {
        id
      }
    })

    if (!album) {
      return new NextResponse('Album not found.', { status: 404 })
    }

    const deleteAlbum = await db.album.delete({
      where: {
        id
      },
      include: {
        photos: true
      }
    })

    return NextResponse.json(deleteAlbum)
  } catch (error) {
    console.log('[ALBUM_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 })
  }
}

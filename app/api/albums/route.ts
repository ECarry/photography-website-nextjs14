import { currentUser } from "@/lib/currentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  try {
    const user = await currentUser()
    const data = await req.json()
    
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const album = await db.album.create({
      data: {
        ...data
      }
    })

    return NextResponse.json(album)
  } catch (error) {
    console.log('[ALBUMS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 })
  }
}

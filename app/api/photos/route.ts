import { currentUser } from "@/lib/currentUser"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const user = await currentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const photo = await db.photo.create({
      data: {
        ...data
      }
    })

    return NextResponse.json(photo)
  } catch (error) {
    console.log('[PHOTOS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 })
  }
}

import { currentUser } from "@/lib/currentUser"
import { db } from "@/lib/db"
import { UserRole } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const user = await currentUser()

    if (!user || user?.role !== UserRole.ADMIN) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const photo = await db.photo.create({
      data: {
        userId: user.id,
        ...data
      }
    })

    return NextResponse.json(photo)
  } catch (error) {
    console.log('[PHOTOS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 })
  }
}

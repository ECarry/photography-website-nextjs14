import { currentUser } from "@/lib/currentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req:Request) {
  try {
    const user = await currentUser()
    const data = await req.json()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const profile = await db.user.update({
      where: {
        userId: user.userId
      },
      data
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.log('[PROFILE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 })
  }
}

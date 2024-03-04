import "server-only";

import { db } from "@/lib/db";

export async function fetchAllPhotos() {
  try {
    const data = await db.photo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch ECarry data.");
  }
}

export async function fetchPhotoById(id: string) {
  try {
    const data = await db.photo.findFirst({
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch photo data.");
  }
}

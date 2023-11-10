import { db } from "@/lib/db";

export async function fetchAlbumPhotos(id: string) {
  try {
    const data = await db.album.findFirst({
      where: {
        id
      },
      include: {
        photos: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch album data.');
  }
}

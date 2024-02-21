import 'server-only'
import { db } from "@/lib/db";

export const fetchECarryPhotos = async(page: number, limit: number) => {
  const skip = (page - 1) * limit
  const take = limit
  try {
    const data = await db.photo.findMany({
      where: {
        category: {
          title: 'ecarry'
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take,
    })

    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ECarry data.');
  }
}

export const fetchAllECarryPhotos = async() => {
  try {
    const data = await db.photo.findMany({
      where: {
        category: {
          title: 'ecarry'
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ECarry data.');
  }
}

export const fetchPhotoInfo = async(id: string) => {
  try {
    const data = await db.photo.findFirst({
      where: {
        id
      }
    })

    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch photo data.');
  }
}

export const fetchAlbum= async() => {
  try {
    const data = await db.album.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        photos: true
      }
    })

    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch album data.');
  }
}

export const fetchAlbumPhotos = async(id: string) => {
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
    throw new Error('Failed to fetch album photos data.');
  }
}

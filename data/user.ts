import { db } from "@/lib/db"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: {email} })
  
    return user
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string| undefined) => {
  try {
    const user = await db.user.findUnique({ where: {id} })
  
    return user
  } catch (error) {
    return null
  }
}

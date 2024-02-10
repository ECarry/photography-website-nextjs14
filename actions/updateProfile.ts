'use server'

import * as z from 'zod'
import { profileFormSchema } from "@/schemas"
import { db } from '@/lib/db'
import { currentUser } from '@/lib/currentUser'

export const updateProfile = async (values: z.infer<typeof profileFormSchema>) => {
  const validatedFields = profileFormSchema.safeParse(values)

  if(!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const user = await currentUser()

  if (!user) {
      return { error: 'User not found!' }
    }

  try {
    await db.user.update({
      where: {
        id: user.id
      },
      data: validatedFields.data
    })
  } catch (error) {
    throw error
  }

  return { success: 'Update successful!'}
}

'use server'

import { CreatePhotoSchema } from '@/schemas';

import * as z from 'zod'

export const createPhoto = async (values: z.infer<typeof CreatePhotoSchema>) => {
  console.log({
    VALUES: values
  });
  
  const validatedFields = CreatePhotoSchema.safeParse(values)

  if(!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { } = validatedFields.data

  try {

  } catch (error) {

  }

  return { success: 'Login successful!'}
}

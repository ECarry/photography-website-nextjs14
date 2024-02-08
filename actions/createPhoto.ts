'use server'

import { db } from '@/lib/db';
import { CreatePhotoSchema } from '@/schemas';

import * as z from 'zod'

export const createPhoto = async (values: z.infer<typeof CreatePhotoSchema>) => {
  console.log({
    VALUES: values
  });
  
  const validatedFields = CreatePhotoSchema.safeParse(values)

  if(!validatedFields.success) {
    console.log(validatedFields.error);
    
    return { error: 'Invalid fields!' }
  }

  try {
    const photo = await db.photo.create({
      data: {...values}
    })

    console.log(photo);
    
  } catch (error) {
    console.log(error);
    
  }

  return { success: 'Created successful!'}
}

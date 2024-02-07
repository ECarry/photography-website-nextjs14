'use server'

import { utapi } from "@/server/uploadthing"

export const deletePhotoFormUploadthing = async (key: string) => {
  await utapi.deleteFiles(key);
}

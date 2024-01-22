import { utapi } from "@/server/uploadthing"

export const deletePhotoFormUploadthing = async ({
  key
}: {
  key: string
}) => {
  await utapi.deleteFiles(key);
}
 


"use server";

import { utapi } from "@/server/uploadthing";
 
export async function uploadPhoto(file: File) {
  const response = await utapi.uploadFiles(file);
  
  console.log({
    res: response
  });
  
}

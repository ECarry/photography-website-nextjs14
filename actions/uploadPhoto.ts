"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

/**
 * @see https://docs.uploadthing.com/api-reference/server#uploadfiles
 */
export async function uploadFiles(fd: FormData) {
  const files = fd.getAll("files") as File[];
  const uploadedFiles = await utapi.uploadFiles(files);
  return uploadedFiles;
}

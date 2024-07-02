"use server";

import { getPlaiceholder } from "plaiceholder";
import { utapi } from "./uploadthing";

export const getImageBlur = async (url?: string) => {
  if (!url) return null;
  try {
    const buffer = await fetch(url).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const { base64 } = await getPlaiceholder(buffer, { size: 10 });

    return base64;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCloudPhoto = async (url: string) => {
  try {
    const key = url.split("/").pop();

    if (!key) {
      return;
    }

    await utapi.deleteFiles(key);
  } catch (error) {
    console.log(error);
  }
};

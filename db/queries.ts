import { db } from "./drizzle";
import { photos } from "./schema";

export const getPhotos = async () => {
  const data = await db.select().from(photos);

  return data;
};

import { db } from "@/db/drizzle";
import { citySets, photos } from "@/db/schema";
import { and, eq, desc, sql } from "drizzle-orm";

export class CitySetService {
  static async upsertCitySetForPhoto(photo: typeof photos.$inferSelect) {
    const { country, countryCode, city, district, id: photoId } = photo;

    if (!country || !city) return null;

    const [citySet] = await db
      .insert(citySets)
      .values({
        country,
        countryCode,
        city,
        district,
        photoCount: 1,
        coverPhotoId: photoId, // 默认使用第一张照片作为封面
      })
      .onConflictDoUpdate({
        target: [
          citySets.country,
          citySets.countryCode,
          citySets.city,
          citySets.district,
        ],
        set: {
          photoCount: sql`${citySets.photoCount} + 1`,
          // 可以添加逻辑选择最佳封面照片
          coverPhotoId: sql`COALESCE(${citySets.coverPhotoId}, ${photoId})`,
        },
      })
      .returning();

    return citySet;
  }

  static async getCitySets(options?: {
    country?: string;
    countryCode?: string;
    limit?: number;
  }) {
    return await db
      .select({
        id: citySets.id,
        country: citySets.country,
        countryCode: citySets.countryCode,
        city: citySets.city,
        district: citySets.district,
        photoCount: citySets.photoCount,
        coverPhoto: {
          url: photos.url,
          blurData: photos.blurData,
          aspectRatio: photos.aspectRatio,
        },
      })
      .from(citySets)
      .leftJoin(photos, eq(citySets.coverPhotoId, photos.id))
      .where(
        and(
          options?.country ? eq(citySets.country, options.country) : undefined,
          options?.countryCode
            ? eq(citySets.countryCode, options.countryCode)
            : undefined
        )
      )
      .limit(options?.limit ?? 20)
      .orderBy(desc(citySets.photoCount));
  }
}

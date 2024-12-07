import { z } from "zod";
import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { and, desc, eq, sql } from "drizzle-orm";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { insertPhotoSchema, photos, citySets } from "@/db/schema";

const app = new Hono()
  /**
   * GET /photos
   * Get all photos from the database
   */
  .get("/", async (c) => {
    const data = await db
      .select()
      .from(photos)
      .orderBy(desc(photos.dateTimeOriginal));

    return c.json({ data });
  })
  /**
   * POST /photos
   * Create a new photo to the database
   */
  // src/app/api/[[...route]]/photos.ts
  .post("/", verifyAuth(), zValidator("json", insertPhotoSchema), async (c) => {
    const values = c.req.valid("json");
    const auth = c.get("authUser");

    if (!auth.token?.id) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }

    try {
      const [insertedPhoto] = await db
        .insert(photos)
        .values(values)
        .returning();

      const cityName =
        values.countryCode === "JP" || values.countryCode === "TW"
          ? values.region
          : values.city;

      // 2. 如果有地理信息，更新城市集合
      if (insertedPhoto.country && cityName) {
        await db
          .insert(citySets)
          .values({
            country: insertedPhoto.country,
            countryCode: insertedPhoto.countryCode,
            city: cityName,
            photoCount: 1,
            coverPhotoId: insertedPhoto.id,
          })
          .onConflictDoUpdate({
            target: [citySets.country, citySets.city],
            set: {
              countryCode: insertedPhoto.countryCode,
              photoCount: sql`${citySets.photoCount} + 1`,
              coverPhotoId: sql`COALESCE(${citySets.coverPhotoId}, ${insertedPhoto.id})`,
              updateAt: new Date(),
            },
          });

        const updatedCitySet = await db
          .select()
          .from(citySets)
          .where(
            sql`${citySets.country} = ${insertedPhoto.country} AND ${citySets.city} = ${insertedPhoto.city}`
          );

        console.log("Updated city set:", updatedCitySet);
      } else {
        console.log(
          "No geo information available for photo:",
          insertedPhoto.id
        );
      }

      return c.json({
        success: true,
        data: insertedPhoto,
      });
    } catch (error) {
      console.error("Photo upload error:", error);
      return c.json(
        {
          success: false,
          error: "Failed to create photo",
          details: error,
        },
        500
      );
    }
  })
  /**
   * DELETE /photos/:id
   * Delete a photo from the database
   */
  .delete(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id) {
        return c.json({ success: false, error: "Unauthorized" }, 401);
      }

      try {
        // 1. 先获取照片信息
        const photoToDelete = await db
          .select()
          .from(photos)
          .where(eq(photos.id, id));

        if (photoToDelete.length === 0) {
          return c.json({ success: false, error: "Photo not found" }, 404);
        }

        const photo = photoToDelete[0];

        // 2. 如果照片有地理信息，先更新对应的城市集合
        if (photo.country && photo.city) {
          // 2.1 先找到对应的城市集合
          const citySet = await db
            .select()
            .from(citySets)
            .where(
              and(
                eq(citySets.country, photo.country),
                eq(citySets.city, photo.city)
              )
            )
            .limit(1);

          if (citySet.length > 0) {
            // 2.2 如果这是封面照片，先找一个新的封面
            if (citySet[0].coverPhotoId === photo.id) {
              // 查找同一城市的其他照片作为新封面
              const newCoverPhoto = await db
                .select()
                .from(photos)
                .where(
                  and(
                    eq(photos.country, photo.country),
                    eq(photos.city, photo.city),
                    sql`${photos.id} != ${photo.id}`
                  )
                )
                .orderBy(desc(photos.dateTimeOriginal))
                .limit(1);

              // 更新城市集合
              await db
                .update(citySets)
                .set({
                  photoCount: sql`${citySets.photoCount} - 1`,
                  coverPhotoId:
                    newCoverPhoto.length > 0 ? newCoverPhoto[0].id : null,
                  updateAt: new Date(),
                })
                .where(
                  and(
                    eq(citySets.country, photo.country),
                    eq(citySets.city, photo.city)
                  )
                );
            } else {
              // 不是封面照片，只更新计数
              await db
                .update(citySets)
                .set({
                  photoCount: sql`${citySets.photoCount} - 1`,
                  updateAt: new Date(),
                })
                .where(
                  and(
                    eq(citySets.country, photo.country),
                    eq(citySets.city, photo.city)
                  )
                );
            }
          }
        }

        // 3. 最后删除照片
        await db.delete(photos).where(eq(photos.id, id));

        return c.json({ success: true, data: photo });
      } catch (error) {
        console.error("Photo deletion error:", error);
        return c.json(
          {
            success: false,
            error: "Failed to delete photo",
            details: error,
          },
          500
        );
      }
    }
  )
  /**
   * GET /photos/:id
   * Get a single photo from the database
   */
  .get("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid("param");
    const data = await db.select().from(photos).where(eq(photos.id, id));

    if (data.length === 0) {
      return c.json({ success: false, error: "Photo not found" }, 404);
    }

    return c.json({ data: data[0] });
  });

export default app;

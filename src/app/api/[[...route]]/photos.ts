import { z } from "zod";
import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { desc, eq, sql } from "drizzle-orm";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { citySets, insertPhotoSchema, photos } from "@/db/schema";
import { CitySetService } from "@/features/photos/services/city-sets-service";

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
      // 1. 先创建照片
      const [insertedPhoto] = await db
        .insert(photos)
        .values(values)
        .returning();

      // 2. 如果有地理信息，更新城市集合
      if (insertedPhoto.country && insertedPhoto.city && insertedPhoto.region) {
        let cityName;
        if (
          insertedPhoto.countryCode === "JP" ||
          insertedPhoto.countryCode === "TW"
        ) {
          cityName = insertedPhoto.region;
        } else {
          cityName = insertedPhoto.city;
        }

        await db
          .insert(citySets)
          .values({
            country: insertedPhoto.country,
            countryCode: insertedPhoto.countryCode,
            city: cityName,
            district: insertedPhoto.district,
            photoCount: 1,
            coverPhotoId: insertedPhoto.id,
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
              coverPhotoId: sql`COALESCE(${citySets.coverPhotoId}, ${insertedPhoto.id})`,
              updateAt: new Date(),
            },
          });
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

      const data = await db.delete(photos).where(eq(photos.id, id)).returning();

      if (data.length === 0) {
        return c.json({ success: false, error: "Photo not found" }, 404);
      }

      return c.json({ data: data[0] });
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
  })
  .get(
    "/city-sets",
    zValidator(
      "query",
      z.object({
        country: z.string().optional(),
        countryCode: z.string().optional(),
        limit: z.coerce.number().optional(),
      })
    ),
    async (c) => {
      const { country, countryCode, limit } = c.req.valid("query");

      try {
        const citySets = await CitySetService.getCitySets({
          country,
          countryCode,
          limit,
        });

        return c.json(citySets);
      } catch (error) {
        return c.json(
          {
            error: "Failed to fetch city sets",
            details: error,
          },
          500
        );
      }
    }
  );

export default app;

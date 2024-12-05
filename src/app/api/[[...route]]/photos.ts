import { z } from "zod";
import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { desc, eq } from "drizzle-orm";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { insertPhotoSchema, photos } from "@/db/schema";

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
  .post("/", verifyAuth(), zValidator("json", insertPhotoSchema), async (c) => {
    const auth = c.get("authUser");
    const values = c.req.valid("json");

    if (!auth.token?.id) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }

    const data = await db.insert(photos).values(values).returning();

    if (!data[0]) {
      return c.json({ success: false, error: "Failed to create photo" }, 500);
    }

    return c.json({ data: data[0] });
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
  .get("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid("param");
    const data = await db.select().from(photos).where(eq(photos.id, id));

    if (data.length === 0) {
      return c.json({ success: false, error: "Photo not found" }, 404);
    }

    return c.json({ data: data[0] });
  });

export default app;

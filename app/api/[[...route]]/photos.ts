import { Hono, Context } from "hono";
import { initAuthConfig, verifyAuth, type AuthConfig } from "@hono/auth-js";
import { db } from "@/db/drizzle";
import { insertPhotoSchema, photos } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { and, desc, eq, gte, lt, asc } from "drizzle-orm";
import authConfig from "@/auth.config";

const app = new Hono()
  .use("*", initAuthConfig(getAuthConfig))
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        year: z.string().optional(),
        sortBy: z.string().optional(),
      })
    ),
    async (c) => {
      const { year, sortBy } = c.req.valid("query");

      let query = db
        .select()
        .from(photos)
        .orderBy(
          sortBy === "tookAsc" ? asc(photos.takeAt) : desc(photos.takeAt)
        );

      if (year && year !== "all") {
        const startDate = new Date(`${year}-01-01T00:00:00.000Z`).toISOString();
        const endDate = new Date(
          `${Number(year) + 1}-01-01T00:00:00.000Z`
        ).toISOString();

        query.where(
          and(gte(photos.takeAt, startDate), lt(photos.takeAt, endDate))
        );
      }

      const data = await query;

      return c.json({
        data,
      });
    }
  )
  .post("/", verifyAuth(), zValidator("json", insertPhotoSchema), async (c) => {
    const auth = c.get("authUser");
    const values = c.req.valid("json");

    if (!auth) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const [data] = await db
      .insert(photos)
      .values({
        ...values,
      })
      .returning();

    return c.json({ data });
  })
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Invalid id" }, 400);
      }

      const [data] = await db.select().from(photos).where(eq(photos.id, id));

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      "json",
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        isFavorite: z.boolean().optional(),
        locationName: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!auth) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .update(photos)
        .set(values)
        .where(eq(photos.id, id))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!auth) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .delete(photos)
        .where(eq(photos.id, id))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  );

function getAuthConfig(c: Context): AuthConfig {
  return { ...authConfig };
}

export default app;

import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { insertPostSchema, posts } from "@/db/schema";
import { z } from "zod";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db.select().from(posts);

    return c.json({ data });
  })
  .get("/check-slug/:slug", async (c) => {
    const slug = c.req.param("slug");
    const existingPost = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug));

    return c.json({ exists: existingPost.length > 0 });
  })
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      insertPostSchema.pick({
        title: true,
        slug: true,
        description: true,
        coverImage: true,
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const values = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ success: false, error: "Unauthorized" }, 401);
      }

      const exitingPost = await db
        .select()
        .from(posts)
        .where(eq(posts.slug, values.slug));

      if (exitingPost.length > 0) {
        return c.json({ success: false, error: "Post already exists" }, 400);
      }

      const data = await db.insert(posts).values(values).returning();

      if (data.length === 0) {
        return c.json({ success: false, error: "Failed to create post" }, 500);
      }

      return c.json({ data: data[0] });
    }
  )
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

      const data = await db.delete(posts).where(eq(posts.id, id)).returning();

      if (data.length === 0) {
        return c.json({ success: false, error: "Not found" }, 404);
      }

      return c.json({ success: true, data: { id } });
    }
  );

export default app;

import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { insertPostSchema, posts } from "@/db/schema";

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
    zValidator("json", insertPostSchema.pick({ title: true, slug: true })),
    async (c) => {
      const auth = c.get("authUser");
      const { title, slug } = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ success: false, error: "Unauthorized" }, 401);
      }

      const exitingPost = await db
        .select()
        .from(posts)
        .where(eq(posts.slug, slug));

      if (exitingPost.length > 0) {
        return c.json({ success: false, error: "Post already exists" }, 400);
      }

      const data = await db
        .insert(posts)
        .values({
          title,
          slug,
        })
        .returning();

      if (data.length === 0) {
        return c.json({ success: false, error: "Failed to create post" }, 500);
      }

      return c.json({ data: data[0] });
    }
  );

export default app;

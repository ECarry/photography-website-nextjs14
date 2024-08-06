import { Hono, Context } from "hono";
import { initAuthConfig, verifyAuth, type AuthConfig } from "@hono/auth-js";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq } from "drizzle-orm";

const app = new Hono().use("*", initAuthConfig(getAuthConfig)).patch(
  "/",
  verifyAuth(),
  zValidator(
    "json",
    z.object({
      name: z.string().optional(),
      image: z.string().optional(),
      password: z.string().optional(),
    })
  ),
  async (c) => {
    const auth = c.get("authUser");
    const values = c.req.valid("json");

    console.log(values);

    //console.log(auth);

    if (!auth) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const [data] = await db
      .update(users)
      .set(values)
      .where(eq(users.id, auth.token?.sub!))
      .returning();

    if (!data) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json({ data });
  }
);

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    providers: [Credentials],
  };
}

export default app;

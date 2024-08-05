import { Hono, Context } from "hono";
import { initAuthConfig, verifyAuth, type AuthConfig } from "@hono/auth-js";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { and, desc, eq, gte, lt, asc, sql } from "drizzle-orm";

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

    console.log(auth);

    if (!auth) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    return c.json({ auth });
  }
);

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    providers: [Credentials],
  };
}

export default app;

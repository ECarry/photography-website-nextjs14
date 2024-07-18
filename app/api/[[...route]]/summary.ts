import { Hono, Context } from "hono";
import { initAuthConfig, verifyAuth, type AuthConfig } from "@hono/auth-js";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db/drizzle";
import { insertPhotoSchema, photos } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { number, z } from "zod";
import { and, desc, eq, gte, lt, asc, sql } from "drizzle-orm";

const app = new Hono()
  .use("*", initAuthConfig(getAuthConfig))
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");

    if (!auth) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const yearRes = await db
      .select({
        year: sql`EXTRACT(YEAR FROM TO_TIMESTAMP(${photos.takeAt}, 'YYYY-MM-DD"T"HH24:MI:SS"Z"'))`.as<string>(),
        count: sql`CAST(COUNT(*) AS INTEGER)`.as<number>(),
      })
      .from(photos)
      .groupBy(
        sql`EXTRACT(YEAR FROM TO_TIMESTAMP(${photos.takeAt}, 'YYYY-MM-DD"T"HH24:MI:SS"Z"'))`
      )
      .orderBy(
        sql`EXTRACT(YEAR FROM TO_TIMESTAMP(${photos.takeAt}, 'YYYY-MM-DD"T"HH24:MI:SS"Z"')) ASC`
      )
      .execute();

    const extractCity = () => sql`
  CASE 
    WHEN COALESCE(${photos.locationName}, '') LIKE '%, %, %, %, %' THEN TRIM(SPLIT_PART(COALESCE(${photos.locationName}, ''), ',', 3))
    WHEN COALESCE(${photos.locationName}, '') LIKE '%, %, %, %' THEN TRIM(SPLIT_PART(COALESCE(${photos.locationName}, ''), ',', 3))
    WHEN COALESCE(${photos.locationName}, '') = '' THEN 'Unknown'
    ELSE TRIM(SPLIT_PART(COALESCE(${photos.locationName}, ''), ',', -1))
  END
`;

    const cityRes = await db
      .select({
        city: extractCity().as<string>(),
        count: sql`CAST(COUNT(*) AS INTEGER)`.as<number>(),
      })
      .from(photos)
      .groupBy(extractCity())
      .orderBy(extractCity())
      .execute();

    return c.json({
      data: {
        yearRes,
        cityRes,
      },
    });
  });

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    providers: [Credentials],
  };
}

export default app;

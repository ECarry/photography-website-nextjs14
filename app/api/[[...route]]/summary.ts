import { Hono, Context } from "hono";
import { initAuthConfig, verifyAuth, type AuthConfig } from "@hono/auth-js";
import { db } from "@/db/drizzle";
import { photos } from "@/db/schema";
import { sql } from "drizzle-orm";
import authConfig from "@/auth.config";

const app = new Hono()
  .use("*", initAuthConfig(getAuthConfig))
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");

    if (!auth) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // 1. 获取年份统计
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

    // 2. 提取城市并统计
    const extractCity = () =>
      sql<string>`
      TRIM(SPLIT_PART(${photos.locationName}, ',', 1))
    `.as("city");

    const cityRes = await db
      .select({
        city: extractCity(),
        count: sql`CAST(COUNT(*) AS INTEGER)`.as<number>(),
      })
      .from(photos)
      .groupBy(extractCity())
      .orderBy(extractCity())
      .execute();

    // 3. 提取国家并去重
    const extractCountry = () =>
      sql<string>`
      TRIM(SPLIT_PART(${photos.locationName}, ',', array_length(string_to_array(${photos.locationName}, ','), 1)))
    `.as("country");

    const countryRes = await db
      .select({
        country: extractCountry(),
      })
      .from(photos)
      .groupBy(extractCountry())
      .execute();

    // 4. 返回的国家数组
    const countryArray = countryRes.map((row) => row.country);

    return c.json({
      data: {
        yearRes,
        cityRes,
        countryArray,
      },
    });
  });

function getAuthConfig(c: Context): AuthConfig {
  return { ...authConfig };
}

export default app;

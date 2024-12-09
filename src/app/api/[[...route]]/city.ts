import { db } from "@/db/drizzle";
import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  const data = await db.query.citySets.findMany({
    with: {
      coverPhoto: true,
    },
  });

  return c.json({ data });
});

export default app;

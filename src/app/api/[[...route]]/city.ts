import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { type InferSelectModel } from "drizzle-orm";
import { type photos, type citySets } from "@/db/schema";

// 定义基础类型
export type CitySet = InferSelectModel<typeof citySets>;
export type Photo = InferSelectModel<typeof photos>;

// 定义包含关联数据的类型
export interface CitySetWithRelations extends CitySet {
  coverPhoto: Photo;
  photos: Photo[];
}

const app = new Hono().get("/", async (c) => {
  const data = await db.query.citySets.findMany({
    with: {
      coverPhoto: true,
      photos: true,
    },
    orderBy: (citySets, { desc }) => [desc(citySets.updateAt)],
  });

  return c.json({ data });
});

// 导出响应类型供客户端使用
export type ApiResponse = {
  data: CitySetWithRelations[];
};

export default app;

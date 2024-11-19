import { Hono } from "hono";
import { handle } from "hono/vercel";
import photos from "./photos";
import summary from "./summary";
import user from "./user";

// Revert to "edge" if planning on running on the edge
export const runtime = "nodejs";

const app = new Hono().basePath("/api");

// app.use(
//   "/api/*",
//   cors({
//     origin: "https://test.ecarry.me",
//     allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
//     allowMethods: ["POST", "GET", "PATCH", "DELETE"],
//     exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
//     maxAge: 600,
//     credentials: true,
//   })
// );

const routes = app
  .route("/photos", photos)
  .route("/summary", summary)
  .route("/user", user);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;

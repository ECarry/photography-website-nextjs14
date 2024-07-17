import { Hono } from "hono";
import { handle } from "hono/vercel";
import photos from "./photos";
import { cors } from "hono/cors";
import summary from "./summary";

export const runtime = "edge";

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

const routes = app.route("/photos", photos).route("/summary", summary);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;

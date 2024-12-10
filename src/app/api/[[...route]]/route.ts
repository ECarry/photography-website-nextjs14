import { Hono } from "hono";
import { handle } from "hono/vercel";
import { AuthConfig, authHandler, initAuthConfig } from "@hono/auth-js";
import authConfig from "@/auth.config";

// routes
import r2 from "./r2";
import map from "./map";
import city from "./city";
import posts from "./posts";
import users from "./users";
import photos from "./photos";

function getAuthConfig(): AuthConfig {
  return {
    secret: process.env.AUTH_SECRET,
    ...authConfig,
  };
}

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));
app.use("/auth/*", authHandler());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/users", users)
  .route("/photos", photos)
  .route("/r2", r2)
  .route("/map", map)
  .route("/city", city)
  .route("/posts", posts);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;

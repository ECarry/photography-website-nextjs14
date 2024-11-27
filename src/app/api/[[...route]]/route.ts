import { Hono } from "hono";
import { handle } from "hono/vercel";
import { AuthConfig, authHandler, initAuthConfig } from "@hono/auth-js";
import authConfig from "@/auth.config";
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
const routes = app.route("/users", users).route("/photos", photos);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;

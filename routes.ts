/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/api/uploadthing"];

/**
 * An array of routes that are accessible to the protect
 * These routes require authentication
 * @type {string[]}
 */
export const protectedRoutes = ["/dashboard", "/photos", "/settings"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /
 * @type {string[]}
 */
export const authRoutes = ["/auth/login"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

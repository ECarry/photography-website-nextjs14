export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard", '/gallery', '/albums', '/settings'] }

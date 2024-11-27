import NextAuth from "next-auth";

import authConfig from "@/auth.config";

export const runtime = "nodejs";

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

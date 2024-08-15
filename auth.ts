import NextAuth, { DefaultSession } from "next-auth";
import { db } from "@/db/drizzle";
import authConfig from "./auth.config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { users } from "./db/schema";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) session.user.id = token.sub;

      if (token.email && session.user) session.user.email = token.email;

      if (session) {
        session.user.name = token.name;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token }) {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, token.email as string),
      });

      if (!existingUser) return token;
      token.picture = existingUser.image;
      token.name = existingUser.name;

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: "/auth/login",
  },
  session: { strategy: "jwt" },
  ...authConfig,
});

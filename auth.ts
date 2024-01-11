import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

import authConfig from "@/auth.config"

import { getUserById } from "@/data/user"

// https://authjs.dev/getting-started/typescript
declare module "@auth/core/types" {
  interface Session {
    user: {
      id: string;
      image: string
    } & DefaultSession["user"] 
  }
}

export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    
  },
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id)

      if (!existingUser) return false
      
      return true
    },
    async session({ session, token }) {

      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      
      if (token.name && session.user) {
        session.user.name = token.name
      }

      if (token.image && session.user) {
        session.user.image = token.image as string
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await db.user.findUnique({ where: { id: token.sub }})

      if (!existingUser) return token

      token.image = existingUser.imageUrl
      token.name = existingUser.username

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
 
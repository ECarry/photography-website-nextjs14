import * as z from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "./db/drizzle";
import { users } from "./db/schema";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const LoginSchema = z.object({
  email: z.string().min(1, {
    message: "Email must be required.",
  }),
  password: z.string().min(1, {
    message: "Password must be required.",
  }),
});

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email),
          });
          if (!existingUser || !existingUser.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            existingUser.password
          );

          if (passwordsMatch) return existingUser;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

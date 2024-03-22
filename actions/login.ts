"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";
import bcrypt from "bcryptjs";

const EMAIL = process.env.USER_EMAIL;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.USER_PASSWORD;

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    if (email !== EMAIL) {
      return {
        error: "Make sure that the email matches the one in the .env file.",
      };
    }

    if (password !== PASSWORD) {
      return {
        error: "Make sure that the password matches the one in the .env file.",
      };
    }
  }

  if (
    EMAIL &&
    USERNAME &&
    PASSWORD &&
    email === EMAIL &&
    password === PASSWORD &&
    !existingUser
  ) {
    try {
      const hashedPassword = await bcrypt.hash(PASSWORD, 10);
      await db.user.create({
        data: {
          email: EMAIL,
          username: USERNAME,
          password: hashedPassword,
          imageUrl: "",
        },
      });
    } catch (error) {
      return { error: "Create User fail:" + error };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }

  return { success: "Login successful!" };
};

import "./drizzle/envConfig";
import * as schema from "@/db/schema";
import bcrypt from "bcryptjs";
import { db } from "@/db/drizzle";

const NAME = process.env.USERNAME;
const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;

if (!NAME || !EMAIL || !PASSWORD) {
  throw new Error("Environment variables USERNAME, USER_EMAIL, and USER_PASSWORD are required.");
}

const createUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(schema.users).values({
    name,
    email,
    password: hashedPassword,
  });
  console.log(`User ${name} created successfully.`);
};

const main = async () => {
  console.log("Seeding database");

  await createUser(NAME, EMAIL, PASSWORD);

  console.log("Seeding finished");
};

main().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});

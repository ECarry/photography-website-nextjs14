import { Hono } from "hono";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { photos } from "@/db/schema";
import { desc } from "drizzle-orm";
import { verifyAuth } from "@hono/auth-js";

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

const uploadSchema = z.object({
  filename: z.string(),
  contentType: z.string(),
});

const getPublicUrl = (filename: string) => {
  const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
  if (!publicUrl) {
    throw new Error("CLOUDFLARE_R2_PUBLIC_URL is not configured");
  }
  return `${publicUrl}/photos/${filename}`;
};

const app = new Hono()
  .get("/", async (c) => {
    const data = await db
      .select()
      .from(photos)
      .orderBy(desc(photos.dateTimeOriginal));
    return c.json({ data });
  })
  .post(
    "/upload",
    verifyAuth(),
    zValidator("json", uploadSchema),
    async (c) => {
      const auth = c.get("authUser");

      if (!auth.token?.id) {
        return c.json({ success: false, error: "Unauthorized" }, 401);
      }

      try {
        const { filename, contentType } = c.req.valid("json");

        const allowedMimeTypes = ["image/jpeg", "image/png"];
        if (!allowedMimeTypes.includes(contentType)) {
          return c.json(
            {
              success: false,
              error:
                "Invalid content type, only image/jpeg, image/png are allowed",
            },
            400
          );
        }

        const command = new PutObjectCommand({
          Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
          Key: `photos/${filename}`,
          ContentType: contentType,
        });

        const url = await getSignedUrl(s3Client, command, {
          expiresIn: 3600,
        });

        const publicUrl = getPublicUrl(filename);

        return c.json({
          success: true,
          data: {
            uploadUrl: url,
            publicUrl,
            filename,
          },
        });
      } catch (error) {
        console.error("Error generating presigned URL:", error);
        return c.json(
          {
            success: false,
            error: "Failed to generate upload URL",
          },
          500
        );
      }
    }
  );

export default app;

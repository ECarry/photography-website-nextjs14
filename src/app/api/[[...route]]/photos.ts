/**
 * API Route for handling photo uploads using Cloudflare R2 (S3-compatible storage)
 * This file implements secure file uploads using pre-signed URLs and handles
 * authentication, validation, and URL generation for photo storage.
 */

import { Hono } from "hono";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { verifyAuth } from "@hono/auth-js";
import { cache } from "react";
import { db } from "@/db/drizzle";
import { photos } from "@/db/schema";
import { desc } from "drizzle-orm";

// Initialize S3 client with Cloudflare R2 configuration
const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

// Define the schema for upload request validation
const uploadSchema = z.object({
  filename: z.string(),
  contentType: z.string(),
});

/**
 * Generate a public URL for accessing uploaded photos
 * Uses React cache to memoize results and improve performance
 * @param filename - The name of the uploaded file
 * @returns The complete public URL for accessing the file
 * @throws Error if CLOUDFLARE_R2_PUBLIC_URL is not configured
 */
const getPublicUrl = cache((filename: string) => {
  const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
  if (!publicUrl) {
    throw new Error("CLOUDFLARE_R2_PUBLIC_URL is not configured");
  }
  return `${publicUrl}/photos/${filename}`;
});

// Create a new Hono app instance and define the upload route
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
    verifyAuth(), // Ensure request is authenticated
    zValidator("json", uploadSchema), // Validate request body
    async (c) => {
      // Get authentication token from request
      const auth = c.get("authUser");

      // Check if user is authenticated
      if (!auth.token?.id) {
        return c.json({ success: false, error: "Unauthorized" }, 401);
      }

      try {
        // Extract and validate file information from request
        const { filename, contentType } = c.req.valid("json");

        // Define allowed file types (JPEG and PNG only)
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

        // Create S3 command for generating pre-signed URL
        const command = new PutObjectCommand({
          Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
          Key: `photos/${filename}`,
          ContentType: contentType,
        });

        // Generate pre-signed URL for direct upload (valid for 1 hour)
        const url = await getSignedUrl(s3Client, command, {
          expiresIn: 3600,
        });

        // Generate public URL for accessing the file after upload
        const publicUrl = getPublicUrl(filename);

        // Return successful response with upload and access URLs
        return c.json({
          success: true,
          data: {
            uploadUrl: url, // Temporary URL for uploading the file
            publicUrl, // Permanent URL for accessing the file
            filename, // Original filename
          },
        });
      } catch (error) {
        // Log and handle any errors during the process
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

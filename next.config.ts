import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-ed3d81ba22ab4902a63ed83571c208fd.r2.dev",
        port: "",
      },
    ],
  },
};

export default nextConfig;

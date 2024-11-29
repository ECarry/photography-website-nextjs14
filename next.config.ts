import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "photograph.ecarry.uk",
        port: "",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./image-loader.js",
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

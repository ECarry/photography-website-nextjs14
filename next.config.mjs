import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */
const config = {
  images: {
    domains: ["utfs.io"],
  },
};

export default withPlaiceholder(config);

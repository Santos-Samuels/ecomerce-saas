import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@ecomerce/shared"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

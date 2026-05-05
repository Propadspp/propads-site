import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'placehold.co' },
      { hostname: 'cdn.sanity.io' },
    ],
  },
};

export default nextConfig;

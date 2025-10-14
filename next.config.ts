import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during production build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during production build for MVP
  },
  experimental: {
    turbo: {
      root: process.cwd(),
    },
  },
};

export default nextConfig;

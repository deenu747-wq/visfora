import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // disable cache components for now - breaks build on Vercel
  experimental: {
    cacheComponents: false,
  }
};

export default nextConfig;

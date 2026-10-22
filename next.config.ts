import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'loremflickr.com' },
      { protocol: 'https', hostname: '**' },
    ],
  },
  // This ensures Vercel never blocks on small TS errors
  typescript: {
    ignoreBuildErrors: false, // keep false, we fixed types properly
  },
};

export default nextConfig;
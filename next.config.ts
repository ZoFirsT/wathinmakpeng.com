import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.wathinmakpeng.stratusone.cloud',
      },
      {
        protocol: 'https',
        hostname: 'cdn.stratusone.co.th',
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for Docker
  output: 'standalone',

  // For Telegram Mini Apps
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For Telegram Mini Apps

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

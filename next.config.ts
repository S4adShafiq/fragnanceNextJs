import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'passionate-cherry-2410795bbd.media.strapiapp.com',
        pathname: '/**', // Allow all image paths
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Disables ESLint checks during production build
  },
};

export default nextConfig;

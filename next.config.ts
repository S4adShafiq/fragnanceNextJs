import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'passionate-cherry-2410795bbd.media.strapiapp.com',
        pathname: '/**', // allow all image paths
      },
    ],
  },
};

export default nextConfig;

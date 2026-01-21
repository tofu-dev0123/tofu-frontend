import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4566',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/books',
        destination: '/maintenance',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/maintenance',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/maintenance',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

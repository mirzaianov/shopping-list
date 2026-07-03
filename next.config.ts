import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // NOTE: Prevent browser MIME sniffing of declared content types
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // NOTE: Limit cross-origin referrer data to the origin
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // NOTE: Disable browser permissions the app does not use
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // NOTE: Block legacy iframe embedding paths
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';
const isVercelPreview = process.env.VERCEL_ENV === 'preview';
const scriptSource = `'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}${
  isVercelPreview ? ' https://vercel.live' : ''
}`;
const connectSource = `${isDevelopment ? "'self' ws://localhost:* ws://127.0.0.1:*" : "'self'"}${
  isVercelPreview ? ' https://vercel.live wss://ws-us3.pusher.com' : ''
}`;
const imageSource = `'self' blob: data:${isVercelPreview ? ' https://vercel.live https://vercel.com' : ''}`;
const styleSource = `'self' 'unsafe-inline'${isVercelPreview ? ' https://vercel.live' : ''}`;
const fontSource = `'self'${isVercelPreview ? ' https://vercel.live https://assets.vercel.com' : ''}`;
const frameSource = isVercelPreview ? "'self' https://vercel.live" : "'self'";

const contentSecurityPolicyReportOnly = `
  default-src 'self';
  script-src ${scriptSource};
  style-src ${styleSource};
  img-src ${imageSource};
  font-src ${fontSource};
  frame-src ${frameSource};
  connect-src ${connectSource};
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
`
  .replace(/\s{2,}/g, ' ')
  .trim();

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
          // NOTE: Observe CSP violations before enforcing the policy
          {
            key: 'Content-Security-Policy-Report-Only',
            value: contentSecurityPolicyReportOnly,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

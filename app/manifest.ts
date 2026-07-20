import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: '#ffffff',
    description: 'A simple-to-use application to support you in organizing your tasks',
    display: 'standalone',
    icons: [
      {
        purpose: 'any',
        sizes: '192x192',
        src: '/icons/icon-192x192.png',
        type: 'image/png',
      },
      {
        purpose: 'any',
        sizes: '512x512',
        src: '/icons/icon-512x512.png',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '512x512',
        src: '/icons/maskable-icon-512x512.png',
        type: 'image/png',
      },
    ],
    name: 'Atemoya',
    short_name: 'Atemoya',
    start_url: '/',
    theme_color: '#ffffff',
  };
}

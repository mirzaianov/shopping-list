import { twoFactorClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

const browserOrigin = typeof window === 'undefined' ? undefined : window.location.origin;

export const authClient = createAuthClient({
  ...(browserOrigin ? { baseURL: browserOrigin } : {}),
  plugins: [twoFactorClient({ twoFactorPage: '/two-factor' })],
});

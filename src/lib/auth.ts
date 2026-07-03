import { betterAuth } from 'better-auth';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { authPasswordPolicy, authRateLimitPolicy } from './auth-policy';
import { db } from '../db/client';
import * as schema from '../db/schema';

const betterAuthSecret = process.env.BETTER_AUTH_SECRET;
const isProduction = process.env.NODE_ENV === 'production';

if (!betterAuthSecret) {
  throw new Error('BETTER_AUTH_SECRET is required.');
}

export const auth = betterAuth({
  secret: betterAuthSecret,
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  rateLimit: {
    enabled: isProduction,
    window: authRateLimitPolicy.windowSeconds,
    max: authRateLimitPolicy.maxRequests,
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: authPasswordPolicy.minLength,
    maxPasswordLength: authPasswordPolicy.maxLength,
  },
});

import { APIError, betterAuth } from 'better-auth';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { nicknameSchema } from './auth-nickname';
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
  databaseHooks: {
    user: {
      create: {
        before: async (newUser) => {
          const parsed = nicknameSchema.safeParse(newUser.name);

          if (!parsed.success) {
            throw APIError.from('BAD_REQUEST', {
              code: 'INVALID_NICKNAME',
              message: parsed.error.issues[0]?.message ?? 'Invalid nickname',
            });
          }

          return { data: { ...newUser, name: parsed.data } };
        },
      },
    },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
});

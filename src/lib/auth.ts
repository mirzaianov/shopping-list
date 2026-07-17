import { APIError, betterAuth } from 'better-auth';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { after } from 'next/server';
import { nicknameSchema } from './auth-nickname';
import { authPasswordPolicy, authRateLimitPolicy } from './auth-policy';
import { db } from '../db/client';
import * as schema from '../db/schema';

const betterAuthSecret = process.env.BETTER_AUTH_SECRET;
const resendApiKey = process.env.RESEND_API_KEY;
const authEmailFrom = process.env.AUTH_EMAIL_FROM;
const isProduction = process.env.NODE_ENV === 'production';

const validateNickname = (nickname: unknown) => {
  const parsed = nicknameSchema.safeParse(nickname);

  if (!parsed.success) {
    throw APIError.from('BAD_REQUEST', {
      code: 'INVALID_NICKNAME',
      message: parsed.error.issues[0]?.message ?? 'Invalid nickname',
    });
  }

  return parsed.data;
};

if (!betterAuthSecret) {
  throw new Error('BETTER_AUTH_SECRET is required.');
}

if (!resendApiKey) {
  throw new Error('RESEND_API_KEY is required.');
}

if (!authEmailFrom) {
  throw new Error('AUTH_EMAIL_FROM is required.');
}

const vercelHosts = [
  process.env.VERCEL_URL,
  process.env.VERCEL_BRANCH_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
].filter((host): host is string => Boolean(host));
const vercelFallbackHost =
  process.env.VERCEL_ENV === 'preview'
    ? process.env.VERCEL_URL
    : (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL);
const betterAuthFallbackUrl = vercelFallbackHost
  ? `https://${vercelFallbackHost}`
  : process.env.BETTER_AUTH_URL;

export const auth = betterAuth({
  secret: betterAuthSecret,
  baseURL:
    vercelHosts.length > 0
      ? {
          allowedHosts: vercelHosts,
          protocol: 'https',
          fallback: betterAuthFallbackUrl,
        }
      : betterAuthFallbackUrl,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  rateLimit: {
    enabled: isProduction,
    window: authRateLimitPolicy.windowSeconds,
    max: authRateLimitPolicy.maxRequests,
  },
  advanced: {
    backgroundTasks: {
      handler: (promise) => after(() => promise),
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: authEmailFrom,
          to: [user.email],
          subject: 'Verify your Atemoya account',
          text: `Verify your Atemoya account by opening this link:\n\n${url}\n\nThis link expires in one hour.`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Resend verification email failed with status ${response.status}.`);
      }
    },
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: false,
    expiresIn: 3600,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: authPasswordPolicy.minLength,
    maxPasswordLength: authPasswordPolicy.maxLength,
  },
  databaseHooks: {
    user: {
      create: {
        before: async (newUser) => {
          return { data: { ...newUser, name: validateNickname(newUser.name) } };
        },
      },
      update: {
        before: async (userData) => {
          if (userData.name === undefined) {
            return { data: userData };
          }

          return { data: { ...userData, name: validateNickname(userData.name) } };
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

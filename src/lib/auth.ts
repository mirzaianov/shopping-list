import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { APIError, betterAuth } from 'better-auth';
import { twoFactor } from 'better-auth/plugins';
import { after } from 'next/server';

import { db } from '../db/client';
import * as schema from '../db/schema';
import { nicknameSchema } from './auth-nickname';
import { authPasswordPolicy, authRateLimitPolicy } from './auth-policy';

const betterAuthSecret = process.env.BETTER_AUTH_SECRET;
const resendApiKey = process.env.RESEND_API_KEY;
const authEmailFrom = process.env.AUTH_EMAIL_FROM;
const isProduction = process.env.NODE_ENV === 'production';
const trustedDevOrigins = isProduction
  ? undefined
  : process.env.ALLOWED_DEV_ORIGINS?.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean)
      .map((origin) => (origin.includes('://') ? origin : `http://${origin}:*`));

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
  advanced: {
    backgroundTasks: {
      handler: (promise) => after(() => promise),
    },
  },
  baseURL:
    vercelHosts.length > 0
      ? {
          allowedHosts: vercelHosts,
          fallback: betterAuthFallbackUrl,
          protocol: 'https',
        }
      : betterAuthFallbackUrl,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  databaseHooks: {
    user: {
      create: {
        before: (newUser) =>
          Promise.resolve({
            data: { ...newUser, name: validateNickname(newUser.name) },
          }),
      },
      update: {
        before: (userData) => {
          if (userData.name === undefined) {
            return Promise.resolve({ data: userData });
          }

          return Promise.resolve({
            data: { ...userData, name: validateNickname(userData.name) },
          });
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    maxPasswordLength: authPasswordPolicy.maxLength,
    minPasswordLength: authPasswordPolicy.minLength,
    requireEmailVerification: true,
  },
  emailVerification: {
    autoSignInAfterVerification: false,
    expiresIn: 3600,
    sendOnSignIn: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      const response = await fetch('https://api.resend.com/emails', {
        body: JSON.stringify({
          from: authEmailFrom,
          subject: 'Verify your Atemoya account',
          text: `Verify your Atemoya account by opening this link:\n\n${url}\n\nThis link expires in one hour.`,
          to: [user.email],
        }),
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Resend verification email failed with status ${response.status}.`);
      }
    },
  },
  plugins: [
    twoFactor({
      accountLockout: {
        durationSeconds: 900,
        enabled: true,
        maxFailedAttempts: 10,
      },
      backupCodeOptions: {
        amount: 10,
      },
      issuer: 'Atemoya',
      trustDeviceMaxAge: 2_592_000,
      twoFactorCookieMaxAge: 600,
    }),
  ],
  rateLimit: {
    enabled: isProduction,
    max: authRateLimitPolicy.maxRequests,
    window: authRateLimitPolicy.windowSeconds,
  },
  secret: betterAuthSecret,
  trustedOrigins: trustedDevOrigins,
  user: {
    deleteUser: {
      enabled: true,
    },
  },
});

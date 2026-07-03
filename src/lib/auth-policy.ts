export const authPasswordPolicy = {
  minLength: 8,
  maxLength: 128,
} as const;

export const authRateLimitPolicy = {
  windowSeconds: 10,
  maxRequests: 100,
} as const;

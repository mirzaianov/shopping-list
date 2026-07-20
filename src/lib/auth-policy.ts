export const authPasswordPolicy = {
  maxLength: 128,
  minLength: 8,
} as const;

export const authRateLimitPolicy = {
  maxRequests: 100,
  windowSeconds: 10,
} as const;

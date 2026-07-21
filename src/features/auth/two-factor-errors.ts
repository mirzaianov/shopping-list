const errorMessages: Record<string, string> = {
  ACCOUNT_TEMPORARILY_LOCKED: 'Too many failed attempts. Try again in 15 minutes.',
  BACKUP_CODES_NOT_ENABLED: 'Backup codes are not available for this account.',
  INVALID_BACKUP_CODE: 'Backup code is invalid or has already been used.',
  INVALID_CODE: 'Code is invalid. Check your authenticator and try again.',
  INVALID_PASSWORD: 'Password is incorrect.',
  SESSION_EXPIRED: 'Please sign in again.',
  TWO_FACTOR_NOT_ENABLED: 'Two-factor authentication is not enabled.',
};

export const isExpiredTwoFactorChallenge = (code?: string) =>
  code === 'INVALID_TWO_FACTOR_COOKIE' || code === 'TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE';

export const getTwoFactorErrorMessage = (code?: string) =>
  (code && errorMessages[code]) ?? 'Two-factor authentication failed. Please try again.';

export const pendingVerificationEmailKey = 'atemoya.pending-verification-email';
export const verificationCallbackURL = '/login?verified=1';

type QueryValue = string | string[] | undefined;

export type VerificationNotice = {
  message: string;
  tone: 'success' | 'error';
};

const firstValue = (value: QueryValue) => (Array.isArray(value) ? value[0] : value);

export const getVerificationNotice = (
  verified: QueryValue,
  error: QueryValue,
): VerificationNotice | undefined => {
  const errorCode = firstValue(error);

  if (errorCode === 'TOKEN_EXPIRED') {
    return {
      message: 'That verification link has expired. Sign in again to request a new one.',
      tone: 'error',
    };
  }

  if (errorCode) {
    return {
      message: 'That verification link is invalid. Sign in again to request a new one.',
      tone: 'error',
    };
  }

  if (firstValue(verified) === '1') {
    return {
      message: 'Email verified. You can sign in.',
      tone: 'success',
    };
  }

  return undefined;
};

export const maskEmail = (email: string) => {
  const separatorIndex = email.indexOf('@');

  if (separatorIndex <= 0) return email;

  const localPart = email.slice(0, separatorIndex);

  return `${localPart[0]}${'*'.repeat(Math.max(1, localPart.length - 1))}${email.slice(separatorIndex)}`;
};

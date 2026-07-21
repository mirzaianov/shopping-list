import assert from 'node:assert/strict';
import test from 'node:test';

import { getTwoFactorErrorMessage, isExpiredTwoFactorChallenge } from './two-factor-errors.ts';

test('maps lockout and expired challenge errors', () => {
  assert.equal(
    getTwoFactorErrorMessage('ACCOUNT_TEMPORARILY_LOCKED'),
    'Too many failed attempts. Try again in 15 minutes.',
  );
  assert.equal(isExpiredTwoFactorChallenge('INVALID_TWO_FACTOR_COOKIE'), true);
  assert.equal(isExpiredTwoFactorChallenge('TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE'), true);
  assert.equal(isExpiredTwoFactorChallenge('INVALID_CODE'), false);
});

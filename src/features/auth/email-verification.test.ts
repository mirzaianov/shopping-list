import assert from 'node:assert/strict';
import test from 'node:test';
import { getVerificationNotice, maskEmail } from './email-verification.ts';

test('masks the local part of a pending email', () => {
  assert.equal(maskEmail('person@example.com'), 'p*****@example.com');
  assert.equal(maskEmail('a@example.com'), 'a*@example.com');
});

test('maps verification callback results', () => {
  assert.deepEqual(getVerificationNotice('1', undefined), {
    message: 'Your email is verified. You can now sign in.',
    tone: 'success',
  });
  assert.equal(getVerificationNotice('1', 'TOKEN_EXPIRED')?.tone, 'error');
  assert.match(getVerificationNotice(undefined, 'INVALID_TOKEN')?.message ?? '', /invalid/i);
});

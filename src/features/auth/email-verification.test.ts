import assert from 'node:assert/strict';
import test from 'node:test';
import { signUpSchema } from './auth-schemas.ts';
import { getVerificationNotice, maskEmail } from './email-verification.ts';

test('masks the local part of a pending email', () => {
  assert.equal(maskEmail('person@example.com'), 'p*****@example.com');
  assert.equal(maskEmail('a@example.com'), 'a*@example.com');
});

test('maps verification callback results', () => {
  assert.deepEqual(getVerificationNotice('1', undefined), {
    message: 'Email verified. You can sign in.',
    tone: 'success',
  });
  assert.equal(getVerificationNotice('1', 'TOKEN_EXPIRED')?.tone, 'error');
  assert.match(getVerificationNotice(undefined, 'INVALID_TOKEN')?.message ?? '', /invalid/i);
});

test('rejects a mistyped email confirmation', () => {
  const result = signUpSchema.safeParse({
    nickname: 'person',
    email: 'person@example.com',
    confirmEmail: 'persno@example.com',
    password: 'password',
    confirmPassword: 'password',
  });

  assert.equal(result.success, false);
  assert.equal(result.error?.issues[0]?.path[0], 'confirmEmail');
});

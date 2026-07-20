'use client';

import { Field } from '@base-ui/react/field';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { ArrowLeft, MailCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';
import type { FormEventHandler } from 'react';

import BrandHeader from '../../components/brand-header';
import Button from '../../components/button';
import { authClient } from '../../lib/auth-client';
import {
  maskEmail,
  pendingVerificationEmailKey,
  verificationCallbackURL,
} from '../auth/email-verification';
import type { VerificationNotice } from '../auth/email-verification';

import buttonStyles from '../../components/button.module.css';
import authStyles from '../auth/auth-page.module.css';
import formStyles from '../signup/signup-form.module.css';
import styles from './check-email.module.css';

const iconSize = 20;
const resendCooldownMs = 30_000;
const subscribeToPendingEmail = () => () => {
  /* empty */
};
const getPendingEmailServerSnapshot = () => '';
const getPendingEmailSnapshot = () => {
  try {
    return sessionStorage.getItem(pendingVerificationEmailKey) ?? '';
  } catch {
    return '';
  }
};

export default function CheckEmail() {
  const router = useRouter();
  const pendingEmail = useSyncExternalStore(
    subscribeToPendingEmail,
    getPendingEmailSnapshot,
    getPendingEmailServerSnapshot,
  );
  const [enteredEmail, setEnteredEmail] = useState<string>();
  const email = enteredEmail ?? pendingEmail;
  const [notice, setNotice] = useState<VerificationNotice>();
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const resendMutation = useMutation({
    mutationFn: async (nextEmail: string) => {
      const { error } = await authClient.sendVerificationEmail({
        callbackURL: verificationCallbackURL,
        email: nextEmail,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    onError: () => {
      setNotice({
        message: 'We could not send a verification email. Please try again.',
        tone: 'error',
      });
    },
    onSuccess: () => {
      setNotice({
        message: 'If this address needs verification, a new email has been sent.',
        tone: 'success',
      });
      setIsCoolingDown(true);
    },
  });

  useEffect(() => {
    if (!isCoolingDown) {
      return;
    }

    const timeout = window.setTimeout(() => setIsCoolingDown(false), resendCooldownMs);

    return () => window.clearTimeout(timeout);
  }, [isCoolingDown]);

  const submit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    resendMutation.mutate(email.trim());
  };

  return (
    <div className={authStyles.container}>
      <BrandHeader />
      <div className={authStyles.formContainer}>
        <h2 className={formStyles.subHeading}>Check your email</h2>
        <p className={styles.description}>
          If this address needs verification, we sent a one-hour link to{' '}
          <strong>{email ? maskEmail(email) : 'the email you entered'}</strong>.
        </p>
        <form onSubmit={submit}>
          <Field.Root className={formStyles.formControl} name="email">
            <Field.Label className={formStyles.label}>
              <span className={formStyles.labelText}>Email</span>
            </Field.Label>
            <Field.Control
              autoComplete="email"
              className={formStyles.input}
              enterKeyHint="send"
              id="verification-email"
              onValueChange={(nextEmail) => {
                setEnteredEmail(nextEmail);
                setNotice(undefined);
              }}
              placeholder="Enter email"
              required
              type="email"
              value={email}
            />
          </Field.Root>
          <p
            aria-live="polite"
            className={styles.status}
            data-tone={notice?.tone}
            role={notice?.tone === 'error' ? 'alert' : 'status'}
          >
            {notice?.message ?? ''}
          </p>
          <Button
            styling={clsx(buttonStyles.standard, buttonStyles.primary)}
            icon={<MailCheck size={iconSize} />}
            text={isCoolingDown ? 'Email Sent' : 'Resend Email'}
            type="submit"
            disabled={!email.trim() || isCoolingDown}
            loading={resendMutation.isPending}
          />
        </form>
        <Button
          styling={clsx(buttonStyles.standard, buttonStyles.neutral, styles.backButton)}
          handleOnClick={() => router.push('/login')}
          icon={<ArrowLeft size={iconSize} />}
          text="Back to Login"
        />
      </div>
    </div>
  );
}

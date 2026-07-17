'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import BrandHeader from '../../components/brand-header';
import { authClient } from '../../lib/auth-client';
import type { VerificationNotice } from '../auth/email-verification';
import { getSignInErrorMessage } from '../auth/auth-error-messages';
import { type SignInFormValues, signInSchema } from '../auth/auth-schemas';
import styles from '../auth/auth-page.module.css';
import LoginForm from './login-form';

type LoginProps = {
  notice?: VerificationNotice;
};

export default function Login({ notice }: LoginProps) {
  const form = useForm<SignInFormValues>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });
  const { setFocus } = form;
  const router = useRouter();
  const signInMutation = useMutation({
    mutationFn: async ({ email, password }: SignInFormValues) => {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        form.setError('root', { message: getSignInErrorMessage(error) });
        return;
      }

      router.push('/');
    },
    onError: () => {
      form.setError('root', { message: 'Sign in failed. Please try again.' });
    },
  });

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const submit = form.handleSubmit((values) => signInMutation.mutateAsync(values));

  return (
    <div className={styles.container}>
      <BrandHeader />
      <div className={styles.formContainer}>
        <LoginForm
          control={form.control}
          notice={notice}
          rootError={form.formState.errors.root?.message}
          isSubmitting={signInMutation.isPending}
          isValid={form.formState.isValid}
          onSubmit={submit}
          clearError={() => form.clearErrors('root')}
          toSignup={() => router.push('/signup')}
        />
      </div>
    </div>
  );
}

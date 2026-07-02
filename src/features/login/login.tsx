'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authClient } from '../../lib/auth-client';
import { getSignInErrorMessage } from '../auth/auth-error-messages';
import { type SignInFormValues, signInSchema } from '../auth/auth-schemas';
import styles from '../auth/auth-page.module.css';
import LoginForm from './login-form';

export default function Login() {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });
  const { setFocus } = form;
  const router = useRouter();

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const submit = form.handleSubmit(async ({ email, password }) => {
    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      form.setError('root', { message: getSignInErrorMessage(error) });
      return;
    }

    router.push('/');
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Shopping List</h1>
      <div className={styles.formContainer}>
        <LoginForm
          register={form.register}
          errors={form.formState.errors}
          isSubmitting={form.formState.isSubmitting}
          onSubmit={submit}
          clearError={() => form.clearErrors('root')}
          toSignup={() => router.push('/signup')}
        />
      </div>
    </div>
  );
}

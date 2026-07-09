'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authClient } from '../../lib/auth-client';
import { getSignUpErrorMessage, getSignUpPasswordErrorMessage } from '../auth/auth-error-messages';
import { type SignUpFormValues, signUpSchema } from '../auth/auth-schemas';
import styles from '../auth/auth-page.module.css';
import SignupForm from './signup-form';

export default function Signup() {
  const form = useForm<SignUpFormValues>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { setFocus } = form;
  const router = useRouter();

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const submit = form.handleSubmit(async ({ email, password }) => {
    const { error } = await authClient.signUp.email({
      email,
      password,
      name: email,
    });

    if (error) {
      const passwordError = getSignUpPasswordErrorMessage(error);

      if (passwordError) {
        form.setError('password', { message: passwordError });
        return;
      }

      form.setError('root', { message: getSignUpErrorMessage(error) });
      return;
    }

    router.push('/');
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Shopping List</h1>
      <div className={styles.formContainer}>
        <SignupForm
          register={form.register}
          errors={form.formState.errors}
          isSubmitting={form.formState.isSubmitting}
          isValid={form.formState.isValid}
          onSubmit={submit}
          clearError={() => form.clearErrors('root')}
          toLogin={() => router.push('/login')}
        />
      </div>
    </div>
  );
}

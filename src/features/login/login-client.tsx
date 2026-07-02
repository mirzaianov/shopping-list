'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authClient } from '../../lib/auth-client';
import { getSignInErrorMessage } from '../auth/auth-error-messages';
import { type SignInFormValues, signInSchema } from '../auth/auth-schemas';
import styles from '../auth/auth-page.module.css';
import SignInView from './sign-in-view';

export default function LoginClient() {
  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });
  const { setFocus } = signInForm;
  const router = useRouter();

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const handleSignIn = signInForm.handleSubmit(async ({ email, password }) => {
    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      signInForm.setError('root', { message: getSignInErrorMessage(error) });
      return;
    }

    router.push('/');
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Shopping List</h1>
      <div className={styles.formContainer}>
        <SignInView
          register={signInForm.register}
          errors={signInForm.formState.errors}
          isSubmitting={signInForm.formState.isSubmitting}
          handleSignIn={handleSignIn}
          clearSignInError={() => signInForm.clearErrors('root')}
          goToSignUp={() => router.push('/signup')}
        />
      </div>
    </div>
  );
}

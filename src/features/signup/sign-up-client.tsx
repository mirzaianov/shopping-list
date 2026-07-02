'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authClient } from '../../lib/auth-client';
import { getSignUpErrorMessage } from '../auth/auth-error-messages';
import { type SignUpFormValues, signUpSchema } from '../auth/auth-schemas';
import styles from '../auth/auth-page.module.css';
import SignUpView from './sign-up-view';

export default function SignUpClient() {
  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { setFocus } = signUpForm;
  const router = useRouter();

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const handleSignUp = signUpForm.handleSubmit(async ({ email, password }) => {
    const { error } = await authClient.signUp.email({
      email,
      password,
      name: email,
    });

    if (error) {
      signUpForm.setError('root', { message: getSignUpErrorMessage(error) });
      return;
    }

    router.push('/');
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Shopping List</h1>
      <div className={styles.formContainer}>
        <SignUpView
          register={signUpForm.register}
          errors={signUpForm.formState.errors}
          isSubmitting={signUpForm.formState.isSubmitting}
          handleSignUp={handleSignUp}
          clearSignUpError={() => signUpForm.clearErrors('root')}
          goToSignIn={() => router.push('/login')}
        />
      </div>
    </div>
  );
}

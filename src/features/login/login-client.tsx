'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import SignInView from '../../components/sign-in-view';
import SignUpView from '../../components/sign-up-view';
import { authClient } from '../../lib/auth-client';
import {
  type SignInFormValues,
  type SignUpFormValues,
  signInSchema,
  signUpSchema,
} from './auth-schemas';
import styles from './login-client.module.css';

export default function LoginClient() {
  const [isRegistering, setIsRegistering] = useState(false);
  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });
  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
    },
  });
  const router = useRouter();

  const handleSignIn = signInForm.handleSubmit(async ({ email, password }) => {
    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      signInForm.setError('root', { message: 'Something went wrong. Please try later.' });
      return;
    }

    router.push('/');
  });

  const handleRegister = signUpForm.handleSubmit(async ({ email, password }) => {
    const { error } = await authClient.signUp.email({
      email,
      password,
      name: email,
    });

    if (error) {
      signUpForm.setError('root', { message: 'Something went wrong. Please check your data.' });
      return;
    }

    router.push('/');
  });

  const switchToRegister = () => {
    signInForm.clearErrors();
    setIsRegistering(true);
  };

  const switchToSignIn = () => {
    signUpForm.clearErrors();
    setIsRegistering(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Shopping List</h1>
      <div className={styles.formContainer}>
        {isRegistering ? (
          <SignUpView
            register={signUpForm.register}
            errors={signUpForm.formState.errors}
            isSubmitting={signUpForm.formState.isSubmitting}
            handleRegister={handleRegister}
            setIsRegistering={switchToSignIn}
          />
        ) : (
          <SignInView
            register={signInForm.register}
            errors={signInForm.formState.errors}
            isSubmitting={signInForm.formState.isSubmitting}
            handleSignIn={handleSignIn}
            setIsRegistering={switchToRegister}
          />
        )}
      </div>
    </div>
  );
}

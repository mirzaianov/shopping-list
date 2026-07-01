'use client';

import { type ChangeEvent, type MouseEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import SignInView from '../../components/sign-in-view';
import SignUpView from '../../components/sign-up-view';
import type { RegisterInformation } from '../../types';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState<RegisterInformation>({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();

  const signInRef = useRef<HTMLInputElement>(null);
  const registerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isMounted = true;
    let unsubscribeAuth: (() => void) | undefined;

    void import('../../../firebase').then(({ auth }) => {
      if (!isMounted) {
        return;
      }

      unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (user) {
          router.replace('/');
        }
      });
    });

    return () => {
      isMounted = false;
      unsubscribeAuth?.();
    };
  }, [router]);

  useEffect(() => {
    if (isRegistering) {
      registerRef.current?.focus();
      return;
    }

    signInRef.current?.focus();
  }, [isRegistering]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { auth } = await import('../../../firebase');

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/');
      })
      .catch((err) => {
        console.log(err.message);
        alert(`Something went wrong. Please try later.`);
      });
  };

  const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert('Please confirm that email are the same');
      return;
    }

    if (registerInformation.password !== registerInformation.confirmPassword) {
      alert('Please confirm that password are the same');
      return;
    }

    const { auth } = await import('../../../firebase');

    createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password)
      .then(() => {
        router.push('/');
      })
      .catch((err) => {
        console.log(err.message);
        alert(`Something went wrong. Please check your data.`);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Shopping List</h1>
      <div className={styles.formContainer}>
        {isRegistering ? (
          <SignUpView
            registerInformation={registerInformation}
            setRegisterInformation={setRegisterInformation}
            registerRef={registerRef}
            handleRegister={handleRegister}
            setIsRegistering={setIsRegistering}
          />
        ) : (
          <SignInView
            handleEmailChange={handleEmailChange}
            email={email}
            signInRef={signInRef}
            handlePasswordChange={handlePasswordChange}
            password={password}
            handleSignIn={handleSignIn}
            setIsRegistering={setIsRegistering}
          />
        )}
      </div>
    </div>
  );
}

import { type ChangeEvent, type MouseEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import SignInView from '../components/sign-in-view';
import SignUpView from '../components/sign-up-view';
import { auth } from '../../firebase';
import type { RegisterInformation } from '../types';
import styles from './welcome.module.css';

export default function Welcome() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState<RegisterInformation>({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const signInRef = useRef<HTMLInputElement>(null);
  const registerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/homepage');
      }
    });
  }, [navigate]);

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

  const handleSignIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/homepage');
      })
      .catch((err) => {
        console.log(err.message);
        alert(`Something went wrong. Please try later.`);
      });
  };

  const handleRegister = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert('Please confirm that email are the same');
      return;
    }

    if (registerInformation.password !== registerInformation.confirmPassword) {
      alert('Please confirm that password are the same');
      return;
    }

    createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password)
      .then(() => {
        navigate('/homepage');
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
          // todo: lazy-loading
          <SignUpView
            registerInformation={registerInformation}
            setRegisterInformation={setRegisterInformation}
            registerRef={registerRef}
            handleRegister={handleRegister}
            setIsRegistering={setIsRegistering}
          />
        ) : (
          // todo: lazy-loading
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

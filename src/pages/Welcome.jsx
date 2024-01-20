import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase.js';
import SignInView from '../components/SignInView.jsx';
import SignUpView from '../components/SignUpView.jsx';

const style = {
  container: `bg-base-100 max-w-[358px] text-center w-full m-auto border-solid border border-neutral rounded-2xl p-5 text-xl text-base-content leading-6 shadow-[5px_5px_0px_-0px] shadow-neutral`,
  formContainer: `flex flex-col items-center justify-center`,
  heading: `truncate text-4xl text-primary text-center mt-3 mb-5 py-2 my-custom-heading-font bg-gradient-to-r from-secondary to-primary to-70% text-transparent bg-clip-text `,
};

export default function Welcome() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const signInRef = useRef();
  const registerRef = useRef();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/homepage');
      }
    });
  }, []);

  useEffect(() => {
    isRegistering ? registerRef.current.focus() : signInRef.current.focus();
  }, [isRegistering]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = (e) => {
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

  const handleRegister = (e) => {
    e.preventDefault();

    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert('Please confirm that email are the same');
      return;
    }

    if (registerInformation.password !== registerInformation.confirmPassword) {
      alert('Please confirm that password are the same');
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password,
    )
      .then(() => {
        navigate('/homepage');
      })
      .catch((err) => {
        console.log(err.message);
        alert(`Something went wrong. Please check your data.`);
      });
  };

  return (
    <div className={style.container}>
      <h1 className={style.heading}>Shopping List</h1>
      <div className={style.formContainer}>
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

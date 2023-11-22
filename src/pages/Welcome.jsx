import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '/firebase.js';
import { LuLogIn, LuUserPlus } from 'react-icons/lu';

const style = {
  container: `bg-base-200 max-w-[500px] text-center w-full m-auto rounded-lg shadow-xl p-4`,
  formContainer: `flex flex-col items-center justify-center`,
  heading: `text-3xl font-bold  text-gray-800 p-2.5 uppercase`,
  subHeading: `text-xl text-gray-800 p-2.5`,
  formControl: `form-control w-full max-w-xs`,
  labelText: `label-text`,
  label: `label`,
  input: `input input-bordered w-full max-w-xs`,
  signInButton: `btn btn-primary mt-4`,
  createAccountButton: `btn btn-outline btn-primary ml-auto mr-auto`,
};

const buttonSmall = 20;
const buttonMedium = 25;
const buttonBig = 40;

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

  const inputRef = useRef();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/homepage');
      }
    });
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
        alert(err.message);
      });
  };

  const handleRegister = () => {
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
        alert(err.message);
      });
  };

  return (
    <div className={style.container}>
      <h1 className={style.heading}>Shopping List</h1>
      <div className={style.formContainer}>
        {isRegistering ? (
          <>
            <input
              className={style.input}
              type="email"
              placeholder="Email"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value,
                })
              }
            />
            <input
              className={style.input}
              type="email"
              placeholder="Confirm Email"
              value={registerInformation.confirmEmail}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmEmail: e.target.value,
                })
              }
            />
            <input
              className={style.input}
              type="password"
              placeholder="Password"
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value,
                })
              }
            />
            <input
              className={style.input}
              type="password"
              placeholder="Confirm Password"
              value={registerInformation.confirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={() => setIsRegistering(false)}>Go Back</button>
          </>
        ) : (
          <>
            <h3 className={style.subHeading}>Please, sign in</h3>
            <form>
              <div className={style.formControl}>
                <label
                  className={style.label}
                  htmlFor="email"
                >
                  <span className={style.labelText}>Email address</span>
                </label>
                <input
                  className={style.input}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleEmailChange}
                  value={email}
                  ref={inputRef}
                />
              </div>
              <div className={style.formControl}>
                <label
                  className={style.label}
                  htmlFor="password"
                >
                  <span className={style.labelText}>Password</span>
                </label>
                <input
                  className={style.input}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={handlePasswordChange}
                  value={password}
                />
              </div>
              <button
                className={style.signInButton}
                onClick={handleSignIn}
                title="Sign In"
              >
                <LuLogIn size={buttonSmall} />
                Sign In
              </button>
            </form>
            <div>
              <h3 className={style.subHeading}>Don't have an account?</h3>
              <button
                className={style.createAccountButton}
                onClick={() => setIsRegistering(true)}
              >
                <LuUserPlus size={buttonSmall} />
                Register
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

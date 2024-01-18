import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { LuUserPlus, LuArrowLeft } from 'react-icons/lu';
import { auth } from '../../firebase.js';
import SignInView from '../components/SignInView.jsx';

const style = {
  container: `bg-base-100 max-w-[358px] text-center w-full m-auto border-solid border border-neutral rounded-2xl p-5 text-xl text-base-content leading-6 shadow-[5px_5px_0px_-0px] shadow-neutral`,
  formContainer: `flex flex-col items-center justify-center`,
  heading: `truncate text-4xl text-primary text-center mt-3 mb-5 py-2 my-custom-heading-font bg-gradient-to-r from-secondary to-primary to-70% text-transparent bg-clip-text `,
  subHeading: `text-2xl p-2.5`,
  formControl: `form-control w-full max-w-xs`,
  labelText: `label-text`,
  label: `label`,
  input: `input input-bordered border-neutral placeholder:text-xl text-xl focus:input-primary w-full max-w-64`,
  signInButton: `btn btn-primary mt-4 text-base-100 min-w-32`,
  secondSubHeading: `p-2.5 mt-4`,
  createAccountButton: `btn btn-outline btn-primary ml-auto mr-auto min-w-32`,
  registerButton: `btn btn-primary mt-4 text-base-100 min-w-32`,
  goBackButton: `btn btn-outline btn-primary mt-4 min-w-32`,
};

const buttonSmall = 20;

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
    auth.onAuthStateChanged((user) => {
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
        alert(err.message);
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
        alert(err.message);
      });
  };

  return (
    <div className={style.container}>
      <h1 className={style.heading}>Shopping List</h1>
      <div className={style.formContainer}>
        {isRegistering ? (
          <>
            <h2 className={style.subHeading}>Registration</h2>
            <form>
              <div className={style.formControl}>
                <label
                  className={style.label}
                  htmlFor="email"
                >
                  <span className={style.labelText}>Email Address</span>
                </label>
                <input
                  className={style.input}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={registerInformation.email}
                  ref={registerRef}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className={style.formControl}>
                <label
                  className={style.label}
                  htmlFor="emailConfirm"
                >
                  <span className={style.labelText}>Confirm Email Address</span>
                </label>
                <input
                  className={style.input}
                  id="emailConfirm"
                  type="email"
                  placeholder="Enter your email"
                  value={registerInformation.confirmEmail}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      confirmEmail: e.target.value,
                    })
                  }
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
                  value={registerInformation.password}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className={style.formControl}>
                <label
                  className={style.label}
                  htmlFor="passwordConfirm"
                >
                  <span className={style.labelText}>Confirm Password</span>
                </label>
                <input
                  className={style.input}
                  id="passwordConfirm"
                  type="password"
                  placeholder="Enter your password"
                  value={registerInformation.confirmPassword}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <button
                className={style.registerButton}
                onClick={handleRegister}
              >
                <LuUserPlus size={buttonSmall} />
                Register
              </button>
            </form>
            <button
              className={style.goBackButton}
              onClick={() => setIsRegistering(false)}
            >
              <LuArrowLeft size={buttonSmall} />
              Go Back
            </button>
          </>
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

import type {
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
  RefObject,
  SetStateAction,
} from 'react';
import { HiMiniUserPlus, HiMiniArrowRightCircle } from 'react-icons/hi2';
import Button from './Button';
import styles from './SignInView.module.css';

const buttonSmall = 24;

type SignInViewProps = {
  handleEmailChange: ChangeEventHandler<HTMLInputElement>;
  handlePasswordChange: ChangeEventHandler<HTMLInputElement>;
  handleSignIn: MouseEventHandler<HTMLButtonElement>;
  email: string;
  password: string;
  signInRef: RefObject<HTMLInputElement | null>;
  setIsRegistering: Dispatch<SetStateAction<boolean>>;
};

function SignInView({
  handleEmailChange,
  handlePasswordChange,
  handleSignIn,
  email,
  password,
  signInRef,
  setIsRegistering,
}: SignInViewProps) {
  return (
    <>
      <h2 className={styles.subHeading}>Please, sign in</h2>
      <form>
        <div className={styles.formControl}>
          <label className={styles.label} htmlFor="email">
            <span className={styles.labelText}>Email Address</span>
          </label>
          <input
            className={styles.input}
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleEmailChange}
            value={email}
            ref={signInRef}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.label} htmlFor="password">
            <span className={styles.labelText}>Password</span>
          </label>
          <input
            className={styles.input}
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        <Button
          styling={styles.signInButton}
          handleOnClick={handleSignIn}
          title="Sign In"
          icon={<HiMiniArrowRightCircle size={buttonSmall} />}
          text="Sign In"
        />
      </form>
      <div>
        <h2 className={styles.secondSubHeading}>Don&apos;t have an account?</h2>
        <Button
          styling={styles.createAccountButton}
          handleOnClick={() => setIsRegistering(true)}
          title="Sign Up"
          icon={<HiMiniUserPlus size={buttonSmall} />}
          text="Sign Up"
        />
      </div>
    </>
  );
}

export default SignInView;

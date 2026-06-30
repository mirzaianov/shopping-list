import type { Dispatch, MouseEventHandler, RefObject, SetStateAction } from 'react';
import { HiMiniUserPlus, HiMiniArrowLeftCircle } from 'react-icons/hi2';
import type { RegisterInformation } from '../types';
import Button from './button';
import styles from './sign-up-view.module.css';

const buttonSmall = 24;

type SignUpViewProps = {
  registerInformation: RegisterInformation;
  setRegisterInformation: Dispatch<SetStateAction<RegisterInformation>>;
  registerRef: RefObject<HTMLInputElement | null>;
  handleRegister: MouseEventHandler<HTMLButtonElement>;
  setIsRegistering: Dispatch<SetStateAction<boolean>>;
};

function SignUpView({
  registerInformation,
  setRegisterInformation,
  registerRef,
  handleRegister,
  setIsRegistering,
}: SignUpViewProps) {
  return (
    <>
      <h2 className={styles.subHeading}>Registration</h2>
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
        <div className={styles.formControl}>
          <label className={styles.label} htmlFor="emailConfirm">
            <span className={styles.labelText}>Confirm Email Address</span>
          </label>
          <input
            className={styles.input}
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
        <div className={styles.formControl}>
          <label className={styles.label} htmlFor="password">
            <span className={styles.labelText}>Password</span>
          </label>
          <input
            className={styles.input}
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
        <div className={styles.formControl}>
          <label className={styles.label} htmlFor="passwordConfirm">
            <span className={styles.labelText}>Confirm Password</span>
          </label>
          <input
            className={styles.input}
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
        <Button
          styling={styles.registerButton}
          handleOnClick={handleRegister}
          title="Register"
          icon={<HiMiniUserPlus size={buttonSmall} />}
          text="Register"
        />
      </form>
      <Button
        styling={styles.goBackButton}
        handleOnClick={() => setIsRegistering(false)}
        title="Go Back"
        icon={<HiMiniArrowLeftCircle size={buttonSmall} />}
        text="Go Back"
      />
    </>
  );
}

export default SignUpView;

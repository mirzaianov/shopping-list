import type { FormEventHandler } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { HiMiniUserPlus, HiMiniArrowRightCircle } from 'react-icons/hi2';
import type { SignInFormValues } from '../features/login/auth-schemas';
import Button from './button';
import styles from './sign-in-view.module.css';

const buttonSmall = 24;

type SignInViewProps = {
  register: UseFormRegister<SignInFormValues>;
  errors: FieldErrors<SignInFormValues>;
  handleSignIn: FormEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
  setIsRegistering: () => void;
};

function SignInView({
  handleSignIn,
  register,
  errors,
  isSubmitting,
  setIsRegistering,
}: SignInViewProps) {
  return (
    <>
      <h2 className={styles.subHeading}>Please, sign in</h2>
      <form onSubmit={handleSignIn} noValidate>
        <div className={styles.formControl}>
          <label className={styles.label} htmlFor="email">
            <span className={styles.labelText}>Email Address</span>
          </label>
          <input
            className={styles.input}
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email')}
          />
          {errors.email?.message && <p className={styles.error}>{errors.email.message}</p>}
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
            {...register('password')}
          />
          {errors.password?.message && <p className={styles.error}>{errors.password.message}</p>}
        </div>
        {errors.root?.message && <p className={styles.error}>{errors.root.message}</p>}
        <Button
          styling={styles.signInButton}
          title="Sign In"
          icon={<HiMiniArrowRightCircle size={buttonSmall} />}
          text="Sign In"
          type="submit"
          disabled={isSubmitting}
        />
      </form>
      <div>
        <h2 className={styles.secondSubHeading}>Don&apos;t have an account?</h2>
        <Button
          styling={styles.createAccountButton}
          handleOnClick={setIsRegistering}
          title="Sign Up"
          icon={<HiMiniUserPlus size={buttonSmall} />}
          text="Sign Up"
        />
      </div>
    </>
  );
}

export default SignInView;

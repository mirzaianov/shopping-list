import type { FormEventHandler } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { HiMiniUserPlus, HiMiniArrowRightCircle } from 'react-icons/hi2';
import clsx from 'clsx';
import Button from '../../components/button';
import type { SignInFormValues } from '../auth/auth-schemas';
import formStyles from '../../styles/form.module.css';
import styles from './login-form.module.css';

const buttonSmall = 24;

type Props = {
  register: UseFormRegister<SignInFormValues>;
  errors: FieldErrors<SignInFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
  clearError: () => void;
  toSignup: () => void;
};

function LoginForm({ onSubmit, register, errors, isSubmitting, clearError, toSignup }: Props) {
  const emailField = register('email', { onChange: clearError });
  const passwordField = register('password', { onChange: clearError });

  return (
    <>
      <h2 className={styles.subHeading}>Please, sign in</h2>
      <form onSubmit={onSubmit} noValidate>
        <div className={styles.formControl}>
          <label className={styles.label} htmlFor="email">
            <span className={styles.labelText}>Email</span>
          </label>
          <input
            className={styles.input}
            id="email"
            type="email"
            autoComplete="username"
            enterKeyHint="next"
            placeholder="Enter email"
            {...emailField}
          />
          <p className={formStyles.error} aria-live="polite">
            {errors.email?.message ?? ''}
          </p>
        </div>
        <div className={styles.formControl}>
          <label className={styles.label} htmlFor="current-password">
            <span className={styles.labelText}>Password</span>
          </label>
          <input
            className={styles.input}
            id="current-password"
            type="password"
            autoComplete="current-password"
            enterKeyHint="done"
            placeholder="Enter password"
            {...passwordField}
          />
          <p className={clsx(formStyles.error, formStyles.submitError)} aria-live="polite">
            {errors.password?.message ?? errors.root?.message ?? ''}
          </p>
        </div>
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
          handleOnClick={toSignup}
          title="Sign Up"
          icon={<HiMiniUserPlus size={buttonSmall} />}
          text="Sign Up"
        />
      </div>
    </>
  );
}

export default LoginForm;

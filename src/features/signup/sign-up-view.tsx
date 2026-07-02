import type { FormEventHandler } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { HiMiniUserPlus, HiMiniArrowLeftCircle } from 'react-icons/hi2';
import clsx from 'clsx';
import Button from '../../components/button';
import type { SignUpFormValues } from '../auth/auth-schemas';
import formStyles from '../../styles/form.module.css';
import styles from './sign-up-view.module.css';

const buttonSmall = 24;

type SignUpViewProps = {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  handleSignUp: FormEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
  clearSignUpError: () => void;
  goToSignIn: () => void;
};

function SignUpView({
  register,
  errors,
  handleSignUp,
  isSubmitting,
  clearSignUpError,
  goToSignIn,
}: SignUpViewProps) {
  const emailField = register('email', { onChange: clearSignUpError });
  const confirmEmailField = register('confirmEmail', { onChange: clearSignUpError });
  const passwordField = register('password', { onChange: clearSignUpError });
  const confirmPasswordField = register('confirmPassword', { onChange: clearSignUpError });

  return (
    <>
      <h2 className={styles.subHeading}>Sign Up</h2>
      <form onSubmit={handleSignUp} noValidate>
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
          <label className={styles.label} htmlFor="emailConfirm">
            <span className={styles.labelText}>Confirm Email</span>
          </label>
          <input
            className={styles.input}
            id="emailConfirm"
            type="email"
            autoComplete="email"
            enterKeyHint="next"
            placeholder="Confirm email"
            {...confirmEmailField}
          />
          <p className={formStyles.error} aria-live="polite">
            {errors.confirmEmail?.message ?? ''}
          </p>
        </div>
        <div className={styles.formControl}>
          <label className={styles.label} htmlFor="new-password">
            <span className={styles.labelText}>Password</span>
          </label>
          <input
            className={styles.input}
            id="new-password"
            type="password"
            autoComplete="new-password"
            enterKeyHint="next"
            placeholder="Enter password"
            {...passwordField}
          />
          <p className={formStyles.error} aria-live="polite">
            {errors.password?.message ?? ''}
          </p>
        </div>
        <div className={styles.formControl}>
          <label className={styles.label} htmlFor="confirm-password">
            <span className={styles.labelText}>Confirm Password</span>
          </label>
          <input
            className={styles.input}
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            enterKeyHint="done"
            placeholder="Confirm password"
            {...confirmPasswordField}
          />
          <p className={clsx(formStyles.error, formStyles.submitError)} aria-live="polite">
            {errors.confirmPassword?.message ?? errors.root?.message ?? ''}
          </p>
        </div>
        <Button
          styling={styles.registerButton}
          title="Sign Up"
          icon={<HiMiniUserPlus size={buttonSmall} />}
          text="Sign Up"
          type="submit"
          disabled={isSubmitting}
        />
      </form>
      <Button
        styling={styles.goBackButton}
        handleOnClick={goToSignIn}
        title="Go Back"
        icon={<HiMiniArrowLeftCircle size={buttonSmall} />}
        text="Go Back"
      />
    </>
  );
}

export default SignUpView;

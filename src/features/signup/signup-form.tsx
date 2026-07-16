import { useState, type FormEventHandler } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ArrowLeft, Eye, EyeOff, UserPlus } from 'lucide-react';
import clsx from 'clsx';
import Button from '../../components/button';
import buttonStyles from '../../components/button.module.css';
import type { SignUpFormValues } from '../auth/auth-schemas';
import formStyles from '../../styles/form.module.css';
import styles from './signup-form.module.css';

const buttonSmall = 20;

type Props = {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
  isValid: boolean;
  clearError: () => void;
  toLogin: () => void;
};

function SignupForm({
  register,
  errors,
  onSubmit,
  isSubmitting,
  isValid,
  clearError,
  toLogin,
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const nicknameField = register('nickname', { onChange: clearError });
  const emailField = register('email', { onChange: clearError });
  const confirmEmailField = register('confirmEmail', { onChange: clearError });
  const passwordField = register('password', { onChange: clearError });
  const confirmPasswordField = register('confirmPassword', { onChange: clearError });

  return (
    <>
      <h2 className={styles.subHeading}>Sign Up</h2>
      <form onSubmit={onSubmit} noValidate>
        <div className={styles.formControl}>
          <label className={styles.label} htmlFor="nickname">
            <span className={styles.labelText}>Nickname</span>
          </label>
          <input
            className={styles.input}
            id="nickname"
            type="text"
            autoComplete="off"
            enterKeyHint="next"
            placeholder="Enter nickname"
            {...nicknameField}
          />
          <p className={formStyles.error} aria-live="polite">
            {errors.nickname?.message ?? ''}
          </p>
        </div>
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
            placeholder="Enter email"
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
          <div className={formStyles.passwordControl}>
            <input
              className={clsx(styles.input, formStyles.passwordInput)}
              id="new-password"
              type={isPasswordVisible ? 'text' : 'password'}
              autoComplete="new-password"
              enterKeyHint="next"
              placeholder="Enter password"
              {...passwordField}
            />
            <button
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              aria-pressed={isPasswordVisible}
              className={clsx(buttonStyles.button, formStyles.passwordToggle)}
              onPointerDown={(event) => {
                event.preventDefault();
                setIsPasswordVisible((visible) => !visible);
              }}
              onClick={(event) => {
                if (event.detail === 0) setIsPasswordVisible((visible) => !visible);
              }}
              title={isPasswordVisible ? 'Hide password' : 'Show password'}
              type="button"
            >
              {isPasswordVisible ? <Eye size={buttonSmall} /> : <EyeOff size={buttonSmall} />}
            </button>
          </div>
          <p className={formStyles.error} aria-live="polite">
            {errors.password?.message ?? ''}
          </p>
        </div>
        <div className={styles.formControl}>
          <label className={styles.label} htmlFor="confirm-password">
            <span className={styles.labelText}>Confirm Password</span>
          </label>
          <div className={formStyles.passwordControl}>
            <input
              className={clsx(styles.input, formStyles.passwordInput)}
              id="confirm-password"
              type={isConfirmationVisible ? 'text' : 'password'}
              autoComplete="new-password"
              enterKeyHint="done"
              placeholder="Enter password"
              {...confirmPasswordField}
            />
            <button
              aria-label={
                isConfirmationVisible ? 'Hide password confirmation' : 'Show password confirmation'
              }
              aria-pressed={isConfirmationVisible}
              className={clsx(buttonStyles.button, formStyles.passwordToggle)}
              onPointerDown={(event) => {
                event.preventDefault();
                setIsConfirmationVisible((visible) => !visible);
              }}
              onClick={(event) => {
                if (event.detail === 0) setIsConfirmationVisible((visible) => !visible);
              }}
              title={
                isConfirmationVisible ? 'Hide password confirmation' : 'Show password confirmation'
              }
              type="button"
            >
              {isConfirmationVisible ? <Eye size={buttonSmall} /> : <EyeOff size={buttonSmall} />}
            </button>
          </div>
          <p className={clsx(formStyles.error, formStyles.submitError)} aria-live="polite">
            {errors.confirmPassword?.message ?? errors.root?.message ?? ''}
          </p>
        </div>
        <Button
          styling={clsx(buttonStyles.standard, buttonStyles.primary, styles.registerButton)}
          title="Sign Up"
          icon={<UserPlus size={buttonSmall} />}
          text="Sign Up"
          type="submit"
          disabled={!isValid}
          loading={isSubmitting}
        />
      </form>
      <Button
        styling={clsx(buttonStyles.standard, buttonStyles.neutral, styles.goBackButton)}
        handleOnClick={toLogin}
        title="Go Back"
        icon={<ArrowLeft size={buttonSmall} />}
        text="Go Back"
      />
    </>
  );
}

export default SignupForm;

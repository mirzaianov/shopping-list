import { useState, type FormEventHandler } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import clsx from 'clsx';
import Button from '../../components/button';
import buttonStyles from '../../components/button.module.css';
import type { SignInFormValues } from '../auth/auth-schemas';
import formStyles from '../../styles/form.module.css';
import styles from './login-form.module.css';

const buttonSmall = 20;

type Props = {
  register: UseFormRegister<SignInFormValues>;
  errors: FieldErrors<SignInFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
  isValid: boolean;
  clearError: () => void;
  toSignup: () => void;
};

function LoginForm({
  onSubmit,
  register,
  errors,
  isSubmitting,
  isValid,
  clearError,
  toSignup,
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
          <div className={formStyles.passwordControl}>
            <input
              className={clsx(styles.input, formStyles.passwordInput)}
              id="current-password"
              type={isPasswordVisible ? 'text' : 'password'}
              autoComplete="current-password"
              enterKeyHint="done"
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
          <p className={clsx(formStyles.error, formStyles.submitError)} aria-live="polite">
            {errors.password?.message ?? errors.root?.message ?? ''}
          </p>
        </div>
        <Button
          styling={styles.signInButton}
          title="Sign In"
          icon={<LogIn size={buttonSmall} />}
          text="Sign In"
          type="submit"
          disabled={isSubmitting || !isValid}
        />
      </form>
      <div>
        <h2 className={styles.secondSubHeading}>Don&apos;t have an account?</h2>
        <Button
          styling={styles.createAccountButton}
          handleOnClick={toSignup}
          title="Sign Up"
          icon={<UserPlus size={buttonSmall} />}
          text="Sign Up"
        />
      </div>
    </>
  );
}

export default LoginForm;

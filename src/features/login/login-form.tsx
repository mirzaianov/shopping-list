import { useState, type FormEventHandler } from 'react';
import { Field } from '@base-ui/react/field';
import { Controller, type Control } from 'react-hook-form';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import clsx from 'clsx';
import Button from '../../components/button';
import buttonStyles from '../../components/button.module.css';
import IconTooltip from '../../components/icon-tooltip';
import type { SignInFormValues } from '../auth/auth-schemas';
import formStyles from '../../styles/form.module.css';
import styles from './login-form.module.css';

const buttonSmall = 20;

type Props = {
  control: Control<SignInFormValues>;
  rootError?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
  isValid: boolean;
  clearError: () => void;
  toSignup: () => void;
};

function LoginForm({
  onSubmit,
  control,
  rootError,
  isSubmitting,
  isValid,
  clearError,
  toSignup,
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <>
      <h2 className={styles.subHeading}>Please, sign in</h2>
      <form onSubmit={onSubmit} noValidate>
        <Controller
          control={control}
          name="email"
          render={({
            field: { name, onBlur, onChange, ref, value },
            fieldState: { error, invalid, isDirty, isTouched },
          }) => (
            <Field.Root
              className={styles.formControl}
              dirty={isDirty}
              invalid={invalid}
              name={name}
              touched={isTouched}
            >
              <Field.Label className={styles.label}>
                <span className={styles.labelText}>Email</span>
              </Field.Label>
              <Field.Control
                autoComplete="username"
                className={styles.input}
                enterKeyHint="next"
                id="email"
                onBlur={onBlur}
                onValueChange={(nextValue) => {
                  onChange(nextValue);
                  clearError();
                }}
                placeholder="Enter email"
                ref={ref}
                type="email"
                value={value}
              />
              <Field.Error aria-live="polite" className={formStyles.error} match>
                {error?.message ?? ''}
              </Field.Error>
            </Field.Root>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: { name, onBlur, onChange, ref, value },
            fieldState: { error, invalid, isDirty, isTouched },
          }) => (
            <Field.Root
              className={styles.formControl}
              dirty={isDirty}
              invalid={invalid || Boolean(rootError)}
              name={name}
              touched={isTouched}
            >
              <Field.Label className={styles.label}>
                <span className={styles.labelText}>Password</span>
              </Field.Label>
              <div className={formStyles.passwordControl}>
                <Field.Control
                  autoComplete="current-password"
                  className={clsx(styles.input, formStyles.passwordInput)}
                  enterKeyHint="done"
                  id="current-password"
                  onBlur={onBlur}
                  onValueChange={(nextValue) => {
                    onChange(nextValue);
                    clearError();
                  }}
                  placeholder="Enter password"
                  ref={ref}
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={value}
                />
                <IconTooltip label={isPasswordVisible ? 'Hide password' : 'Show password'}>
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
                    type="button"
                  >
                    {isPasswordVisible ? <Eye size={buttonSmall} /> : <EyeOff size={buttonSmall} />}
                  </button>
                </IconTooltip>
              </div>
              <Field.Error
                aria-live="polite"
                className={clsx(formStyles.error, formStyles.submitError)}
                match
              >
                {error?.message ?? rootError ?? ''}
              </Field.Error>
            </Field.Root>
          )}
        />
        <Button
          styling={clsx(buttonStyles.standard, buttonStyles.primary, styles.signInButton)}
          icon={<LogIn size={buttonSmall} />}
          text="Sign In"
          type="submit"
          disabled={!isValid}
          loading={isSubmitting}
        />
      </form>
      <div>
        <h2 className={styles.secondSubHeading}>Don&apos;t have an account?</h2>
        <Button
          styling={clsx(buttonStyles.standard, buttonStyles.neutral, styles.createAccountButton)}
          handleOnClick={toSignup}
          icon={<UserPlus size={buttonSmall} />}
          text="Sign Up"
        />
      </div>
    </>
  );
}

export default LoginForm;

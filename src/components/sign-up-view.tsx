import type { FormEventHandler } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { HiMiniUserPlus, HiMiniArrowLeftCircle } from 'react-icons/hi2';
import type { SignUpFormValues } from '../features/login/auth-schemas';
import Button from './button';
import styles from './sign-up-view.module.css';

const buttonSmall = 24;

type SignUpViewProps = {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  handleRegister: FormEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
  setIsRegistering: () => void;
};

function SignUpView({
  register,
  errors,
  handleRegister,
  isSubmitting,
  setIsRegistering,
}: SignUpViewProps) {
  return (
    <>
      <h2 className={styles.subHeading}>Registration</h2>
      <form onSubmit={handleRegister} noValidate>
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
          <p className={styles.error} aria-live="polite">
            {errors.email?.message ?? ''}
          </p>
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
            {...register('confirmEmail')}
          />
          <p className={styles.error} aria-live="polite">
            {errors.confirmEmail?.message ?? ''}
          </p>
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
          <p className={styles.error} aria-live="polite">
            {errors.password?.message ?? ''}
          </p>
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
            {...register('confirmPassword')}
          />
          <p className={styles.error} aria-live="polite">
            {errors.confirmPassword?.message ?? ''}
          </p>
        </div>
        <p className={styles.error} aria-live="polite">
          {errors.root?.message ?? ''}
        </p>
        <Button
          styling={styles.registerButton}
          title="Register"
          icon={<HiMiniUserPlus size={buttonSmall} />}
          text="Register"
          type="submit"
          disabled={isSubmitting}
        />
      </form>
      <Button
        styling={styles.goBackButton}
        handleOnClick={setIsRegistering}
        title="Go Back"
        icon={<HiMiniArrowLeftCircle size={buttonSmall} />}
        text="Go Back"
      />
    </>
  );
}

export default SignUpView;

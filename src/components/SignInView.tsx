import type {
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
  RefObject,
  SetStateAction,
} from 'react';
import { HiMiniUserPlus, HiMiniArrowRightCircle } from 'react-icons/hi2';
import Button from './Button';

const style = {
  subHeading: `my-custom-subheading-font text-2xl p-2.5`,
  formControl: `form-control w-full max-w-xs mb-3`,
  labelText: `label-text`,
  label: `label`,
  input: `input input-bordered border-neutral placeholder:text-xl text-xl focus:input-primary w-full max-w-64`,
  signInButton: `btn btn-primary mt-4 text-base-100 min-w-32`,
  secondSubHeading: `my-custom-subheading-font p-2.5 pb-5 mt-4`,
  createAccountButton: `btn btn-outline btn-primary ml-auto mr-auto min-w-32`,
};

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
      <h2 className={style.subHeading}>Please, sign in</h2>
      <form>
        <div className={style.formControl}>
          <label className={style.label} htmlFor="email">
            <span className={style.labelText}>Email Address</span>
          </label>
          <input
            className={style.input}
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleEmailChange}
            value={email}
            ref={signInRef}
          />
        </div>
        <div className={style.formControl}>
          <label className={style.label} htmlFor="password">
            <span className={style.labelText}>Password</span>
          </label>
          <input
            className={style.input}
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        <Button
          styling={style.signInButton}
          handleOnClick={handleSignIn}
          title="Sign In"
          icon={<HiMiniArrowRightCircle size={buttonSmall} />}
          text="Sign In"
        />
      </form>
      <div>
        <h2 className={style.secondSubHeading}>Don&apos;t have an account?</h2>
        <Button
          styling={style.createAccountButton}
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

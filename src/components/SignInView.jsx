import PropTypes from 'prop-types';
import { LuLogIn, LuUserPlus } from 'react-icons/lu';

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

const buttonSmall = 20;

function SignInView({
  handleEmailChange,
  handlePasswordChange,
  handleSignIn,
  email,
  password,
  signInRef,
  setIsRegistering,
}) {
  return (
    <>
      <h2 className={style.subHeading}>Please, sign in</h2>
      <form>
        <div className={style.formControl}>
          <label
            className={style.label}
            htmlFor="email"
          >
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
          <label
            className={style.label}
            htmlFor="password"
          >
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
        <button
          className={style.signInButton}
          onClick={handleSignIn}
          title="Sign In"
        >
          <LuLogIn size={buttonSmall} />
          Sign In
        </button>
      </form>
      <div>
        <h2 className={style.secondSubHeading}>Don't have an account?</h2>
        <button
          className={style.createAccountButton}
          onClick={() => setIsRegistering(true)}
        >
          <LuUserPlus size={buttonSmall} />
          Sign Up
        </button>
      </div>
    </>
  );
}

SignInView.propTypes = {
  handleEmailChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSignIn: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  signInRef: PropTypes.object.isRequired,
  setIsRegistering: PropTypes.func.isRequired,
};

export default SignInView;

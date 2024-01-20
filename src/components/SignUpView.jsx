import PropTypes from 'prop-types';
import { HiMiniUserPlus, HiMiniArrowLeftCircle } from 'react-icons/hi2';
import Button from './Button';

const style = {
  subHeading: `my-custom-subheading-font text-2xl p-2.5`,
  formControl: `form-control w-full max-w-xs mb-3`,
  labelText: `label-text`,
  label: `label`,
  input: `input input-bordered border-neutral placeholder:text-xl text-xl focus:input-primary w-full max-w-64`,
  secondSubHeading: `p-2.5 mt-4`,
  registerButton: `btn btn-primary mt-4 text-base-100 min-w-32`,
  goBackButton: `btn btn-outline btn-primary mt-4 min-w-32`,
};

const buttonSmall = 24;

function SignInView({
  registerInformation,
  setRegisterInformation,
  registerRef,
  handleRegister,
  setIsRegistering,
}) {
  return (
    <>
      <h2 className={style.subHeading}>Registration</h2>
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
        <div className={style.formControl}>
          <label
            className={style.label}
            htmlFor="emailConfirm"
          >
            <span className={style.labelText}>Confirm Email Address</span>
          </label>
          <input
            className={style.input}
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
            value={registerInformation.password}
            onChange={(e) =>
              setRegisterInformation({
                ...registerInformation,
                password: e.target.value,
              })
            }
          />
        </div>
        <div className={style.formControl}>
          <label
            className={style.label}
            htmlFor="passwordConfirm"
          >
            <span className={style.labelText}>Confirm Password</span>
          </label>
          <input
            className={style.input}
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
          styling={style.registerButton}
          handleOnClick={handleRegister}
          title="Register"
          icon={<HiMiniUserPlus size={buttonSmall} />}
          text="Register"
        />
      </form>
      <Button
        styling={style.goBackButton}
        handleOnClick={() => setIsRegistering(false)}
        title="Go Back"
        icon={<HiMiniArrowLeftCircle size={buttonSmall} />}
        text="Go Back"
      />
    </>
  );
}

SignInView.propTypes = {
  registerInformation: PropTypes.object.isRequired,
  setRegisterInformation: PropTypes.func.isRequired,
  registerRef: PropTypes.object.isRequired,
  handleRegister: PropTypes.func.isRequired,
  setIsRegistering: PropTypes.func.isRequired,
};

export default SignInView;

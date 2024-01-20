import { PropTypes } from 'prop-types';

function Button({ styling, handleOnClick, title, icon, text }) {
  return (
    <button
      className={styling}
      onClick={handleOnClick}
      title={title}
    >
      {icon}
      {text}
    </button>
  );
}

Button.propTypes = {
  styling: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;

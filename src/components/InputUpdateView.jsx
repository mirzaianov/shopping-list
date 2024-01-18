import PropTypes from 'prop-types';
import { HiMiniCheckCircle } from 'react-icons/hi2';

const style = {
  input: `input w-full input-bordered border-neutral placeholder:text-xl text-xl focus:input-primary`,
  addButton: `ml-5 mr-1 text-primary `,
};

const buttonBig = 48;

const InputUpdateView = ({
  todo,
  editRef,
  handleInputChange,
  handleInputBlur,
  handleKeyDown,
  handleEditConfirm,
}) => {
  return (
    <>
      <input
        required
        className={style.input}
        type="text"
        placeholder="Edit the item"
        value={todo}
        ref={editRef}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
      />
      <button
        className={style.confirmButton}
        onClick={handleEditConfirm}
        title="Confirm the changes"
      >
        <HiMiniCheckCircle size={buttonBig} />
      </button>
    </>
  );
};

InputUpdateView.propTypes = {
  todo: PropTypes.string.isRequired,
  editRef: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleInputBlur: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  handleEditConfirm: PropTypes.func.isRequired,
};

export default InputUpdateView;

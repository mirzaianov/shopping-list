import PropTypes from 'prop-types';
import { HiMiniPlusCircle } from 'react-icons/hi2';

const style = {
  input: `input w-full input-bordered border-neutral placeholder:text-xl text-xl focus:input-primary`,
  addButton: `ml-5 mr-1 text-primary `,
};

const buttonBig = 48;

const InputAddView = ({
  todo,
  addRef,
  handleInputChange,
  handleInputBlur,
  handleKeyDown,
  writeToDatabase,
}) => {
  return (
    <>
      <input
        required
        className={style.input}
        type="text"
        placeholder="Add an item"
        value={todo}
        ref={addRef}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
      />
      <button
        className={style.addButton}
        onClick={writeToDatabase}
        title="Add an item to the list"
      >
        <HiMiniPlusCircle size={buttonBig} />
      </button>
    </>
  );
};

InputAddView.propTypes = {
  todo: PropTypes.string.isRequired,
  addRef: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleInputBlur: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  writeToDatabase: PropTypes.func.isRequired,
};

export default InputAddView;

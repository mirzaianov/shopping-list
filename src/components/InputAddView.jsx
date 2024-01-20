import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { HiMiniPlusCircle } from 'react-icons/hi2';
import Button from './Button';

const style = {
  input: `input w-full input-bordered border-neutral placeholder:text-xl text-xl focus:input-primary`,
  addButton: `ml-5 mr-1 text-primary `,
};

const buttonBig = 48;

const InputAddView = ({
  todo,
  handleInputChange,
  handleInputBlur,
  handleKeyDown,
  writeToDatabase,
}) => {
  const addRef = useRef();

  useEffect(() => {
    addRef.current.focus();
  }, [addRef]);

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
      <Button
        styling={style.addButton}
        handleOnClick={writeToDatabase}
        title="Add an item"
        icon={<HiMiniPlusCircle size={buttonBig} />}
        text=""
      />
    </>
  );
};

InputAddView.propTypes = {
  todo: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleInputBlur: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  writeToDatabase: PropTypes.func.isRequired,
};

export default InputAddView;

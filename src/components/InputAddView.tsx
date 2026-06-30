import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type KeyboardEventHandler,
  type MouseEventHandler,
  useEffect,
  useRef,
} from 'react';
import { HiMiniPlusCircle } from 'react-icons/hi2';
import Button from './Button';
import styles from './InputAddView.module.css';

const buttonBig = 48;

type InputAddViewProps = {
  todo: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  handleInputBlur: FocusEventHandler<HTMLInputElement>;
  handleKeyDown: KeyboardEventHandler<HTMLInputElement>;
  writeToDatabase: MouseEventHandler<HTMLButtonElement>;
};

const InputAddView = ({
  todo,
  handleInputChange,
  handleInputBlur,
  handleKeyDown,
  writeToDatabase,
}: InputAddViewProps) => {
  const addRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    addRef.current?.focus();
  }, []);

  return (
    <>
      <input
        required
        className={styles.input}
        type="text"
        placeholder="Add an item"
        value={todo}
        ref={addRef}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
      />
      <Button
        styling={styles.addButton}
        handleOnClick={writeToDatabase}
        title="Add an item"
        icon={<HiMiniPlusCircle size={buttonBig} />}
        text=""
      />
    </>
  );
};

export default InputAddView;

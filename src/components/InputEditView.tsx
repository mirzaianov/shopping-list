import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type KeyboardEventHandler,
  type MouseEventHandler,
  useEffect,
  useRef,
} from 'react';
import { HiMiniCheckCircle } from 'react-icons/hi2';
import Button from './Button';
import styles from './InputEditView.module.css';

const buttonBig = 48;

type InputEditViewProps = {
  todo: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  handleInputBlur: FocusEventHandler<HTMLInputElement>;
  handleKeyDown: KeyboardEventHandler<HTMLInputElement>;
  handleEditConfirm: MouseEventHandler<HTMLButtonElement>;
};

const InputUpdateView = ({
  todo,
  handleInputChange,
  handleInputBlur,
  handleKeyDown,
  handleEditConfirm,
}: InputEditViewProps) => {
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editRef.current?.focus();
  }, []);

  return (
    <>
      <input
        required
        className={styles.input}
        type="text"
        placeholder="Edit the item"
        value={todo}
        ref={editRef}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
      />
      <Button
        styling={styles.confirmButton}
        handleOnClick={handleEditConfirm}
        title="Edit the item"
        icon={<HiMiniCheckCircle size={buttonBig} />}
        text=""
      />
    </>
  );
};

export default InputUpdateView;

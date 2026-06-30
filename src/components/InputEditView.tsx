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

const style = {
  input: `input w-full input-bordered border-neutral placeholder:text-xl text-xl focus:input-primary`,
  confirmButton: `ml-5 mr-1 text-primary `,
};

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
        className={style.input}
        type="text"
        placeholder="Edit the item"
        value={todo}
        ref={editRef}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
      />
      <Button
        styling={style.confirmButton}
        handleOnClick={handleEditConfirm}
        title="Edit the item"
        icon={<HiMiniCheckCircle size={buttonBig} />}
        text=""
      />
    </>
  );
};

export default InputUpdateView;

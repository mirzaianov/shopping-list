import type { MouseEventHandler, ReactNode } from 'react';

type ButtonProps = {
  styling: string;
  handleOnClick: MouseEventHandler<HTMLButtonElement>;
  title: string;
  icon: ReactNode;
  text: string;
};

function Button({ styling, handleOnClick, title, icon, text }: ButtonProps) {
  return (
    <button className={styling} onClick={handleOnClick} title={title}>
      {icon}
      {text}
    </button>
  );
}

export default Button;

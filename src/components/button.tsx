import type { MouseEventHandler, ReactNode } from 'react';
import styles from './button.module.css';

type ButtonProps = {
  styling: string;
  handleOnClick: MouseEventHandler<HTMLButtonElement>;
  title: string;
  icon: ReactNode;
  text: string;
};

function Button({ styling, handleOnClick, title, icon, text }: ButtonProps) {
  const className = styling ? `${styles.button} ${styling}` : styles.button;

  return (
    <button className={className} onClick={handleOnClick} title={title}>
      {icon}
      {text}
    </button>
  );
}

export default Button;

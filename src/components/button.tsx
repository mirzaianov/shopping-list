import type { MouseEventHandler, ReactNode } from 'react';
import styles from './button.module.css';

type ButtonProps = {
  styling: string;
  handleOnClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  icon: ReactNode;
  text: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

function Button({
  styling,
  handleOnClick,
  title,
  icon,
  text,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const className = styling ? `${styles.button} ${styling}` : styles.button;

  return (
    <button
      className={className}
      onClick={handleOnClick}
      title={title}
      type={type}
      disabled={disabled}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;

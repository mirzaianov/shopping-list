import type { MouseEventHandler, ReactNode } from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import styles from './button.module.css';

type ButtonProps = {
  styling: string;
  handleOnClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  icon?: ReactNode;
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
  const className = `${styles.button} ${styling}`;

  return (
    <BaseButton
      className={className}
      onClick={handleOnClick}
      title={title}
      type={type}
      disabled={disabled}
    >
      <span className={styles.buttonTop}>
        {icon}
        {text}
      </span>
    </BaseButton>
  );
}

export default Button;

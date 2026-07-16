import type { MouseEventHandler, ReactNode } from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import clsx from 'clsx';
import Spinner from './spinner';
import styles from './button.module.css';

type ButtonProps = {
  styling: string;
  handleOnClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  icon?: ReactNode;
  text: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
};

function Button({
  styling,
  handleOnClick,
  title,
  icon,
  text,
  type = 'button',
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <BaseButton
      aria-busy={loading || undefined}
      aria-label={loading ? `${text} in progress` : undefined}
      className={clsx(styles.button, styling)}
      onClick={handleOnClick}
      title={title}
      type={type}
      disabled={disabled || loading}
    >
      <span className={styles.buttonTop}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {icon}
            {text}
          </>
        )}
      </span>
    </BaseButton>
  );
}

export default Button;

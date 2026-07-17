import type { MouseEventHandler, ReactNode } from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import clsx from 'clsx';
import Spinner from './spinner';
import styles from './button.module.css';

type ButtonProps = {
  styling: string;
  handleOnClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
  text: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
};

function Button({
  styling,
  handleOnClick,
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
      type={type}
      disabled={disabled || loading}
    >
      <span className={styles.buttonTop}>
        <span
          aria-hidden={loading || undefined}
          className={clsx(styles.buttonContent, loading && styles.buttonContentHidden)}
        >
          {icon}
          {text}
        </span>
        {loading ? (
          <span className={styles.buttonSpinner}>
            <Spinner />
          </span>
        ) : null}
      </span>
    </BaseButton>
  );
}

export default Button;

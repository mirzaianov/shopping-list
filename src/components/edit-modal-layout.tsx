'use client';

import { Dialog } from '@base-ui/react/dialog';
import clsx from 'clsx';
import { CircleCheck, X } from 'lucide-react';
import type { FormEventHandler, ReactNode } from 'react';

import Button from './button';

import buttonStyles from './button.module.css';
import styles from './modal-form-layout.module.css';

const iconSize = 20;

interface EditModalLayoutProps {
  children: ReactNode;
  confirmDisabled: boolean;
  confirmPending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export default function EditModalLayout({
  children,
  confirmDisabled,
  confirmPending,
  onSubmit,
}: EditModalLayoutProps) {
  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
      {children}
      <div className={styles.actions}>
        <Dialog.Close
          className={clsx(
            buttonStyles.button,
            buttonStyles.action,
            buttonStyles.fullWidth,
            buttonStyles.neutral,
          )}
          disabled={confirmPending}
          type="button"
        >
          <span className={buttonStyles.buttonTop}>
            <X size={iconSize} />
            Cancel
          </span>
        </Dialog.Close>
        <Button
          disabled={confirmDisabled}
          icon={<CircleCheck size={iconSize} />}
          loading={confirmPending}
          styling={clsx(buttonStyles.action, buttonStyles.fullWidth, buttonStyles.primary)}
          text="Confirm"
          type="submit"
        />
      </div>
    </form>
  );
}

'use client';

import type { FormEventHandler, ReactNode } from 'react';
import { AlertDialog } from '@base-ui/react/alert-dialog';
import { Trash2, X } from 'lucide-react';
import clsx from 'clsx';
import Button from './button';
import buttonStyles from './button.module.css';
import styles from './modal-form-layout.module.css';

const iconSize = 20;

type DeleteModalLayoutProps = {
  children: ReactNode;
  confirmDisabled: boolean;
  confirmPending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default function DeleteModalLayout({
  children,
  confirmDisabled,
  confirmPending,
  onSubmit,
}: DeleteModalLayoutProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
      <div className={styles.actions}>
        <AlertDialog.Close
          className={clsx(
            buttonStyles.button,
            buttonStyles.action,
            buttonStyles.fullWidth,
            buttonStyles.neutral,
          )}
          type="button"
        >
          <span className={buttonStyles.buttonTop}>
            <X size={iconSize} />
            Cancel
          </span>
        </AlertDialog.Close>
        <Button
          disabled={confirmDisabled}
          icon={<Trash2 size={iconSize} />}
          loading={confirmPending}
          styling={clsx(buttonStyles.action, buttonStyles.fullWidth, buttonStyles.destructive)}
          text="Confirm"
          type="submit"
        />
      </div>
    </form>
  );
}

'use client';

import type { FormEventHandler, ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Trash2, X } from 'lucide-react';
import clsx from 'clsx';
import Button from './button';
import buttonStyles from './button.module.css';
import styles from './delete-modal-layout.module.css';

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
        <Dialog.Close
          className={clsx(
            buttonStyles.button,
            buttonStyles.action,
            buttonStyles.actionFull,
            buttonStyles.neutral,
          )}
          type="button"
        >
          <span className={buttonStyles.buttonTop}>
            <X size={iconSize} />
            Cancel
          </span>
        </Dialog.Close>
        <Button
          disabled={confirmDisabled}
          icon={<Trash2 size={iconSize} />}
          loading={confirmPending}
          styling={clsx(buttonStyles.action, buttonStyles.actionFull, buttonStyles.destructive)}
          text="Confirm"
          title="Confirm deletion"
          type="submit"
        />
      </div>
    </form>
  );
}

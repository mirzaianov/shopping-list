'use client';

import type { FormEventHandler, ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { CircleCheck, X } from 'lucide-react';
import clsx from 'clsx';
import Button from './button';
import buttonStyles from './button.module.css';
import styles from './modal-form-layout.module.css';

const iconSize = 20;

type EditModalLayoutProps = {
  children: ReactNode;
  confirmDisabled: boolean;
  confirmPending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

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
          title="Confirm changes"
          type="submit"
        />
      </div>
    </form>
  );
}

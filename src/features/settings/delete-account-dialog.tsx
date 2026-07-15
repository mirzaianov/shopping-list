'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@base-ui/react/dialog';
import { Trash2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import Button from '../../components/button';
import buttonStyles from '../../components/button.module.css';
import { authClient } from '../../lib/auth-client';
import inputStyles from '../home/shopping-item-form.module.css';
import styles from './delete-account-dialog.module.css';

const buttonSmall = 20;
const closeIconSize = 24;

type DeleteAccountDialogProps = {
  userEmail: string;
};

type DeleteAccountFormValues = {
  confirmEmail: string;
};

const getDeleteAccountError = (code?: string) => {
  if (code === 'SESSION_EXPIRED') {
    return 'Please sign in again before deleting your account.';
  }

  return 'Account could not be deleted. Please try again.';
};

export default function DeleteAccountDialog({ userEmail }: DeleteAccountDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setError,
    setFocus,
    watch,
  } = useForm<DeleteAccountFormValues>({
    defaultValues: {
      confirmEmail: '',
    },
  });
  const confirmedEmail = watch('confirmEmail');
  const isConfirmed = confirmedEmail.trim().toLowerCase() === userEmail.toLowerCase();

  useEffect(() => {
    if (!isOpen) {
      reset({ confirmEmail: '' });
      return;
    }

    setFocus('confirmEmail');
  }, [isOpen, reset, setFocus]);

  const onSubmit = handleSubmit(async ({ confirmEmail }) => {
    if (confirmEmail.trim().toLowerCase() !== userEmail.toLowerCase()) {
      setError('confirmEmail', { message: 'Email does not match.' });
      return;
    }

    const { error } = await authClient.deleteUser({
      callbackURL: '/login',
    });

    if (error) {
      setError('root', { message: getDeleteAccountError(error.code) });
      return;
    }

    router.push('/login');
    router.refresh();
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger
        className={clsx(
          buttonStyles.button,
          buttonStyles.action,
          buttonStyles.actionFull,
          buttonStyles.destructive,
        )}
        title="Delete account"
        type="button"
      >
        <span className={buttonStyles.buttonTop}>
          <Trash2 size={buttonSmall} />
          Delete Account
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Viewport className={styles.viewport}>
          <Dialog.Popup className={styles.popup}>
            <Dialog.Close
              aria-label="Close account deletion dialog"
              className={clsx(buttonStyles.button, styles.closeButton)}
              title="Close account deletion dialog"
              type="button"
            >
              <X size={closeIconSize} />
            </Dialog.Close>

            <form className={styles.form} onSubmit={onSubmit}>
              <Dialog.Title className={styles.title}>Delete Account</Dialog.Title>
              <div className={styles.formControl}>
                <label className={styles.label} htmlFor="delete-account-email">
                  Enter your email
                </label>
                <input
                  className={inputStyles.input}
                  id="delete-account-email"
                  type="email"
                  autoComplete="email"
                  enterKeyHint="done"
                  {...register('confirmEmail', { onChange: () => clearErrors() })}
                />
                <p className={styles.error} aria-live="polite">
                  {errors.confirmEmail?.message ?? errors.root?.message ?? ''}
                </p>
              </div>
              <Button
                disabled={isSubmitting || !isConfirmed}
                icon={<Trash2 size={buttonSmall} />}
                styling={clsx(
                  buttonStyles.action,
                  buttonStyles.actionFull,
                  buttonStyles.destructive,
                )}
                text="Delete Account"
                title="Confirm account deletion"
                type="submit"
              />
            </form>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

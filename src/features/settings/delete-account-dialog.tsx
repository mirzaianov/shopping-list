'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@base-ui/react/dialog';
import { Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import buttonStyles from '../../components/button.module.css';
import DeleteModalLayout from '../../components/delete-modal-layout';
import ModalLayout from '../../components/modal-layout';
import { authClient } from '../../lib/auth-client';
import inputStyles from '../home/shopping-item-form.module.css';
import styles from './delete-account-dialog.module.css';

const buttonSmall = 20;

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
  const errorMessage = errors.confirmEmail?.message ?? errors.root?.message;

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
      <ModalLayout title="Delete Account">
        <DeleteModalLayout confirmDisabled={isSubmitting || !isConfirmed} onSubmit={onSubmit}>
          <div className={styles.formControl}>
            <label className={styles.label} htmlFor="delete-account-email">
              Enter your email to delete the account
            </label>
            <input
              className={inputStyles.input}
              id="delete-account-email"
              type="email"
              autoComplete="email"
              enterKeyHint="done"
              {...register('confirmEmail', { onChange: () => clearErrors() })}
            />
            {errorMessage ? (
              <p className={styles.error} role="alert">
                {errorMessage}
              </p>
            ) : null}
          </div>
        </DeleteModalLayout>
      </ModalLayout>
    </Dialog.Root>
  );
}

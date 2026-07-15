'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@base-ui/react/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck, FilePen, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import clsx from 'clsx';
import buttonStyles from '../../components/button.module.css';
import { nicknameSchema } from '../../lib/auth-nickname';
import dialogStyles from './delete-account-dialog.module.css';
import styles from './settings.module.css';
import { updateNicknameAction } from './settings-actions';

const iconSize = 20;
const closeIconSize = 24;
const nicknameFormSchema = z.object({ nickname: nicknameSchema });

type NicknameFormValues = z.infer<typeof nicknameFormSchema>;

type NicknameEditDialogProps = {
  currentNickname: string;
};

export default function NicknameEditDialog({ currentNickname }: NicknameEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [pendingNickname, setPendingNickname] = useState(currentNickname);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
    setFocus,
  } = useForm<NicknameFormValues>({
    resolver: zodResolver(nicknameFormSchema),
    defaultValues: { nickname: currentNickname },
  });

  useEffect(() => {
    if (!isOpen) {
      setIsConfirming(false);
      reset({ nickname: currentNickname });
      return;
    }

    if (!isConfirming) {
      setFocus('nickname');
    }
  }, [currentNickname, isConfirming, isOpen, reset, setFocus]);

  const prepareConfirmation = handleSubmit(({ nickname }) => {
    if (nickname === currentNickname) {
      setError('nickname', { message: 'Enter a different nickname.' });
      return;
    }

    setPendingNickname(nickname);
    setIsConfirming(true);
  });

  const updateNickname = async () => {
    setIsUpdating(true);
    const result = await updateNicknameAction(pendingNickname);
    setIsUpdating(false);

    if (result.error) {
      setIsConfirming(false);
      setError('nickname', { message: result.error });
      return;
    }

    setIsOpen(false);
    router.refresh();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger
        className={clsx(
          buttonStyles.button,
          buttonStyles.action,
          buttonStyles.neutral,
          styles.editButton,
        )}
        title="Edit nickname"
        type="button"
      >
        <span className={buttonStyles.buttonTop}>
          <FilePen size={iconSize} />
          Edit
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={dialogStyles.backdrop} />
        <Dialog.Viewport className={dialogStyles.viewport}>
          <Dialog.Popup className={dialogStyles.popup}>
            <Dialog.Close
              aria-label="Close nickname dialog"
              className={clsx(buttonStyles.button, dialogStyles.closeButton)}
              title="Close nickname dialog"
              type="button"
            >
              <X size={closeIconSize} />
            </Dialog.Close>

            {isConfirming ? (
              <>
                <Dialog.Title className={dialogStyles.title}>Confirm Nickname</Dialog.Title>
                <p className={styles.dialogMessage}>
                  Change nickname to <strong>{pendingNickname}</strong>?
                </p>
                <div className={styles.dialogActions}>
                  <button
                    className={clsx(
                      buttonStyles.button,
                      buttonStyles.action,
                      buttonStyles.actionFull,
                      buttonStyles.neutral,
                    )}
                    disabled={isUpdating}
                    onClick={() => setIsConfirming(false)}
                    type="button"
                  >
                    <span className={buttonStyles.buttonTop}>
                      <X size={iconSize} />
                      Cancel
                    </span>
                  </button>
                  <button
                    className={clsx(
                      buttonStyles.button,
                      buttonStyles.action,
                      buttonStyles.actionFull,
                      buttonStyles.primary,
                    )}
                    disabled={isUpdating}
                    onClick={updateNickname}
                    type="button"
                  >
                    <span className={buttonStyles.buttonTop}>
                      <CircleCheck size={iconSize} />
                      Confirm
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <form className={dialogStyles.form} onSubmit={prepareConfirmation}>
                <Dialog.Title className={dialogStyles.title}>Edit Nickname</Dialog.Title>
                <div className={dialogStyles.formControl}>
                  <label className={dialogStyles.label} htmlFor="edit-nickname">
                    Nickname
                  </label>
                  <input
                    className={styles.input}
                    id="edit-nickname"
                    type="text"
                    autoComplete="off"
                    {...register('nickname')}
                  />
                  <p className={dialogStyles.error} aria-live="polite">
                    {errors.nickname?.message ?? ''}
                  </p>
                </div>
                <button
                  className={clsx(
                    buttonStyles.button,
                    buttonStyles.action,
                    buttonStyles.actionFull,
                    buttonStyles.neutral,
                  )}
                  type="submit"
                >
                  <span className={buttonStyles.buttonTop}>
                    <CircleCheck size={iconSize} />
                    Continue
                  </span>
                </button>
              </form>
            )}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@base-ui/react/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CircleCheck, FilePen, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import clsx from 'clsx';
import Button from '../../components/button';
import buttonStyles from '../../components/button.module.css';
import ModalLayout from '../../components/modal-layout';
import { nicknameSchema } from '../../lib/auth-nickname';
import dialogStyles from './delete-account-dialog.module.css';
import styles from './settings.module.css';
import { updateNicknameAction } from './settings-actions';

const iconSize = 20;
const nicknameFormSchema = z.object({ nickname: nicknameSchema });

type NicknameFormValues = z.infer<typeof nicknameFormSchema>;

type NicknameEditDialogProps = {
  currentNickname: string;
};

export default function NicknameEditDialog({ currentNickname }: NicknameEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
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
  const updateNicknameMutation = useMutation({
    mutationFn: updateNicknameAction,
  });

  useEffect(() => {
    if (!isOpen) {
      reset({ nickname: currentNickname });
      return;
    }

    setFocus('nickname');
  }, [currentNickname, isOpen, reset, setFocus]);

  const updateNickname = handleSubmit(async ({ nickname }) => {
    if (nickname === currentNickname) {
      setError('nickname', { message: 'Enter a different nickname.' });
      return;
    }

    const result = await updateNicknameMutation.mutateAsync(nickname);

    if (result.error) {
      setError('nickname', { message: result.error });
      return;
    }

    setIsOpen(false);
    router.refresh();
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger
        className={clsx(
          buttonStyles.button,
          buttonStyles.standard,
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
      <ModalLayout title="Edit Nickname">
        <form className={dialogStyles.form} onSubmit={updateNickname}>
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
          <div className={styles.dialogActions}>
            <Dialog.Close
              className={clsx(
                buttonStyles.button,
                buttonStyles.action,
                buttonStyles.actionFull,
                buttonStyles.neutral,
              )}
              disabled={updateNicknameMutation.isPending}
              type="button"
            >
              <span className={buttonStyles.buttonTop}>
                <X size={iconSize} />
                Cancel
              </span>
            </Dialog.Close>
            <Button
              icon={<CircleCheck size={iconSize} />}
              loading={updateNicknameMutation.isPending}
              styling={clsx(buttonStyles.action, buttonStyles.actionFull, buttonStyles.primary)}
              text="Confirm"
              title="Confirm nickname"
              type="submit"
            />
          </div>
        </form>
      </ModalLayout>
    </Dialog.Root>
  );
}

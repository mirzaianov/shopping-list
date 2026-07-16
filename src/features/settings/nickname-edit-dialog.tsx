'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@base-ui/react/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { FilePen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import clsx from 'clsx';
import buttonStyles from '../../components/button.module.css';
import EditModalLayout from '../../components/edit-modal-layout';
import formStyles from '../../components/modal-form-layout.module.css';
import ModalLayout from '../../components/modal-layout';
import { nicknameSchema } from '../../lib/auth-nickname';
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
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    setError,
    setFocus,
  } = useForm<NicknameFormValues>({
    mode: 'onChange',
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
          buttonStyles.primary,
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
        <EditModalLayout
          confirmDisabled={!isValid}
          confirmPending={updateNicknameMutation.isPending}
          onSubmit={updateNickname}
        >
          <div className={formStyles.formControl}>
            <label className={formStyles.label} htmlFor="edit-nickname">
              Nickname
            </label>
            <input
              className={styles.input}
              id="edit-nickname"
              type="text"
              autoComplete="off"
              {...register('nickname')}
            />
            <p className={formStyles.error} aria-live="polite">
              {errors.nickname?.message ?? ''}
            </p>
          </div>
        </EditModalLayout>
      </ModalLayout>
    </Dialog.Root>
  );
}

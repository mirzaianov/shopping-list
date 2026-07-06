'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@base-ui/react/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { HiMiniCheckCircle, HiMiniXCircle } from 'react-icons/hi2';
import Button from '../../components/button';
import buttonStyles from '../../components/button.module.css';
import formStyles from '../../styles/form.module.css';
import { useStore } from '../../store/store';
import { updateShoppingItemAction } from './shopping-list-actions';
import { type ShoppingItemFormValues, shoppingItemSchema } from './shopping-item-schemas';
import inputStyles from './shopping-item-form.module.css';
import styles from './shopping-item-edit-dialog.module.css';

const buttonSmall = 24;

export default function ShoppingItemEditDialog() {
  const editingItem = useStore((state) => state.editingItem);
  const cancelEdit = useStore((state) => state.cancelEdit);
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ShoppingItemFormValues>({
    resolver: zodResolver(shoppingItemSchema),
    defaultValues: { todo: '' },
  });
  const todoValue = watch('todo');
  const hasTodoText = todoValue.trim().length > 0;
  const errorMessage = errors.todo?.message ?? submitError;

  useEffect(() => {
    setSubmitError('');

    if (!editingItem) {
      reset({ todo: '' });
      return;
    }

    reset({ todo: editingItem.todo });
    setFocus('todo');
  }, [editingItem, reset, setFocus]);

  const onSubmit = handleSubmit(async ({ todo }) => {
    if (!editingItem) {
      return;
    }

    setSubmitError('');
    const result = await updateShoppingItemAction(editingItem.id, todo);

    if (result.error) {
      setSubmitError(result.error);
      return;
    }

    cancelEdit();
    reset({ todo: '' });
    router.refresh();
  });

  return (
    <Dialog.Root
      open={Boolean(editingItem)}
      onOpenChange={(open) => {
        if (!open) {
          cancelEdit();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Viewport className={styles.viewport}>
          <Dialog.Popup className={styles.popup}>
            <div className={styles.header}>
              <Dialog.Title className={styles.title}>Edit item</Dialog.Title>
              <Dialog.Description className={styles.description}>
                Update the selected shopping-list item.
              </Dialog.Description>
            </div>

            <form className={styles.form} onSubmit={onSubmit}>
              <label className={styles.label} htmlFor="edit-todo">
                Item
              </label>
              <input
                required
                aria-describedby="edit-todo-error"
                aria-invalid={Boolean(errorMessage)}
                className={inputStyles.input}
                id="edit-todo"
                type="text"
                {...register('todo')}
              />
              <p
                className={clsx(formStyles.error, styles.error)}
                id="edit-todo-error"
                aria-live="polite"
              >
                {errorMessage}
              </p>

              <div className={styles.actions}>
                <Dialog.Close
                  className={clsx(buttonStyles.button, styles.secondaryButton)}
                  title="Cancel editing"
                  type="button"
                >
                  <HiMiniXCircle size={buttonSmall} />
                  Cancel
                </Dialog.Close>
                <Button
                  disabled={isSubmitting || !hasTodoText}
                  icon={<HiMiniCheckCircle size={buttonSmall} />}
                  styling={styles.primaryButton}
                  text="Save"
                  title="Save item"
                  type="submit"
                />
              </div>
            </form>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

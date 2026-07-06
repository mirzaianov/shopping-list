'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@base-ui/react/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { HiMiniCheckCircle, HiMiniXMark } from 'react-icons/hi2';
import buttonStyles from '../../components/button.module.css';
import { useStore } from '../../store/store';
import { updateShoppingItemAction } from './shopping-list-actions';
import { type ShoppingItemFormValues, shoppingItemSchema } from './shopping-item-schemas';
import inputStyles from './shopping-item-form.module.css';
import styles from './shopping-item-edit-dialog.module.css';

const buttonSmall = 24;
const buttonBig = 48;

export default function ShoppingItemEditDialog() {
  const editingItem = useStore((state) => state.editingItem);
  const cancelEdit = useStore((state) => state.cancelEdit);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    watch,
    formState: { isSubmitting },
  } = useForm<ShoppingItemFormValues>({
    resolver: zodResolver(shoppingItemSchema),
    defaultValues: { todo: '' },
  });
  const todoValue = watch('todo');
  const hasTodoText = todoValue.trim().length > 0;

  useEffect(() => {
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

    const result = await updateShoppingItemAction(editingItem.id, todo);

    if (result.error) {
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
            <Dialog.Close
              aria-label="Close edit dialog"
              className={clsx(buttonStyles.button, styles.closeButton)}
              title="Close edit dialog"
              type="button"
            >
              <HiMiniXMark size={buttonSmall} />
            </Dialog.Close>

            <form className={styles.form} onSubmit={onSubmit}>
              <Dialog.Title className={styles.label} id="edit-todo-label">
                Edit Item
              </Dialog.Title>
              <div className={styles.formRow}>
                <input
                  required
                  aria-labelledby="edit-todo-label"
                  className={inputStyles.input}
                  id="edit-todo"
                  type="text"
                  {...register('todo')}
                />
                <button
                  className={clsx(buttonStyles.button, inputStyles.actionButton)}
                  disabled={isSubmitting || !hasTodoText}
                  title="Save item"
                  type="submit"
                >
                  <HiMiniCheckCircle size={buttonBig} />
                </button>
              </div>
            </form>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

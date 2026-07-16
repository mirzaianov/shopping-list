'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@base-ui/react/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { CircleCheck } from 'lucide-react';
import { toast } from 'sonner';
import buttonStyles from '../../components/button.module.css';
import ModalLayout from '../../components/modal-layout';
import Spinner from '../../components/spinner';
import type { Todo } from '../../types';
import { updateShoppingItemAction } from './shopping-list-actions';
import { type ShoppingItemFormValues, shoppingItemSchema } from './shopping-item-schemas';
import inputStyles from './shopping-item-form.module.css';
import styles from './shopping-item-edit-dialog.module.css';

const buttonBig = 48;

type ShoppingItemEditDialogProps = {
  editingItem: Todo | null;
  onClose: () => void;
};

export default function ShoppingItemEditDialog({
  editingItem,
  onClose,
}: ShoppingItemEditDialogProps) {
  const router = useRouter();
  const { register, handleSubmit, reset, setFocus, watch } = useForm<ShoppingItemFormValues>({
    resolver: zodResolver(shoppingItemSchema),
    defaultValues: { todo: '' },
  });
  const todoValue = watch('todo');
  const hasTodoText = todoValue.trim().length > 0;
  const updateItemMutation = useMutation({
    mutationFn: ({ id, todo }: { id: string; todo: string }) => updateShoppingItemAction(id, todo),
  });

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

    try {
      const result = await updateItemMutation.mutateAsync({ id: editingItem.id, todo });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.info('Item updated');
      onClose();
      reset({ todo: '' });
      router.refresh();
    } catch {
      toast.error('Item could not be updated. Please try again.');
    }
  });

  return (
    <Dialog.Root
      open={Boolean(editingItem)}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <ModalLayout title="Edit Item" titleId="edit-todo-label">
        <form className={styles.form} onSubmit={onSubmit}>
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
              aria-busy={updateItemMutation.isPending || undefined}
              aria-label={updateItemMutation.isPending ? 'Saving item' : 'Save item'}
              className={clsx(buttonStyles.button, inputStyles.actionButton)}
              disabled={updateItemMutation.isPending || !hasTodoText}
              title="Save item"
              type="submit"
            >
              {updateItemMutation.isPending ? (
                <Spinner size={buttonBig} />
              ) : (
                <CircleCheck size={buttonBig} />
              )}
            </button>
          </div>
        </form>
      </ModalLayout>
    </Dialog.Root>
  );
}

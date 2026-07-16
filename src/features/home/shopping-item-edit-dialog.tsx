'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@base-ui/react/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import EditModalLayout from '../../components/edit-modal-layout';
import formStyles from '../../components/modal-form-layout.module.css';
import ModalLayout from '../../components/modal-layout';
import type { Todo } from '../../types';
import { updateShoppingItemAction } from './shopping-list-actions';
import { type ShoppingItemFormValues, shoppingItemSchema } from './shopping-item-schemas';
import inputStyles from './shopping-item-form.module.css';

type ShoppingItemEditDialogProps = {
  editingItem: Todo | null;
  onClose: () => void;
};

export default function ShoppingItemEditDialog({
  editingItem,
  onClose,
}: ShoppingItemEditDialogProps) {
  const router = useRouter();
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    reset,
    setFocus,
  } = useForm<ShoppingItemFormValues>({
    mode: 'onChange',
    resolver: zodResolver(shoppingItemSchema),
    defaultValues: { todo: '' },
  });
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
      <ModalLayout title="Edit Item">
        <EditModalLayout
          confirmDisabled={!editingItem || !isValid}
          confirmPending={updateItemMutation.isPending}
          onSubmit={onSubmit}
        >
          <div className={formStyles.formControl}>
            <label className={formStyles.label} htmlFor="edit-todo">
              Item
            </label>
            <input
              className={inputStyles.input}
              id="edit-todo"
              type="text"
              autoComplete="off"
              {...register('todo')}
            />
            <p className={formStyles.error} aria-live="polite">
              {errors.todo?.message ?? ''}
            </p>
          </div>
        </EditModalLayout>
      </ModalLayout>
    </Dialog.Root>
  );
}

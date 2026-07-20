'use client';

import { Dialog } from '@base-ui/react/dialog';
import { Field } from '@base-ui/react/field';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import EditModalLayout from '../../components/edit-modal-layout';
import ModalLayout from '../../components/modal-layout';
import { toast } from '../../components/toast-provider';
import type { Todo } from '../../types';
import { shoppingItemSchema } from './shopping-item-schemas';
import type { ShoppingItemFormValues } from './shopping-item-schemas';
import { updateShoppingItemAction } from './shopping-list-actions';

import formStyles from '../../components/modal-form-layout.module.css';
import inputStyles from './shopping-item-form.module.css';

interface ShoppingItemEditDialogProps {
  editingItem: Todo | null;
  onClose: () => void;
}

export default function ShoppingItemEditDialog({
  editingItem,
  onClose,
}: ShoppingItemEditDialogProps) {
  const router = useRouter();
  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
    setFocus,
  } = useForm<ShoppingItemFormValues>({
    defaultValues: { todo: '' },
    mode: 'onChange',
    resolver: zodResolver(shoppingItemSchema),
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
      const result = await updateItemMutation.mutateAsync({
        id: editingItem.id,
        todo,
      });

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
          <Controller
            control={control}
            name="todo"
            render={({
              field: { name, onBlur, onChange, ref, value },
              fieldState: { error, invalid, isDirty, isTouched },
            }) => (
              <Field.Root
                className={formStyles.formControl}
                dirty={isDirty}
                invalid={invalid}
                name={name}
                touched={isTouched}
              >
                <Field.Label className={formStyles.label}>Item</Field.Label>
                <Field.Control
                  autoComplete="off"
                  className={inputStyles.input}
                  id="edit-todo"
                  onBlur={onBlur}
                  onValueChange={onChange}
                  ref={ref}
                  type="text"
                  value={value}
                />
                <Field.Error aria-live="polite" className={formStyles.error} match>
                  {error?.message ?? ''}
                </Field.Error>
              </Field.Root>
            )}
          />
        </EditModalLayout>
      </ModalLayout>
    </Dialog.Root>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { HiMiniCheckCircle, HiMiniPlusCircle } from 'react-icons/hi2';
import buttonStyles from '../../components/button.module.css';
import { useStore } from '../../store/store';
import { createShoppingItemAction, updateShoppingItemAction } from './shopping-list-actions';
import { type ShoppingItemFormValues, shoppingItemSchema } from './shopping-item-schemas';
import styles from './home.module.css';
import inputStyles from './shopping-item-form.module.css';

const buttonBig = 48;

export default function ShoppingItemForm() {
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
    setFocus('todo');
  }, [setFocus]);

  useEffect(() => {
    reset({ todo: editingItem?.todo ?? '' });
  }, [editingItem, reset]);

  const onSubmit = handleSubmit(async ({ todo }) => {
    const result = editingItem
      ? await updateShoppingItemAction(editingItem.id, todo)
      : await createShoppingItemAction(todo);

    if (result.error) {
      return;
    }

    reset({ todo: '' });
    cancelEdit();
    router.refresh();
  });

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.formRow}>
        <input
          required
          className={inputStyles.input}
          type="text"
          placeholder={editingItem ? 'Edit the item' : 'Add an item'}
          {...register('todo')}
        />
        <button
          className={clsx(buttonStyles.button, inputStyles.actionButton)}
          type="submit"
          title={editingItem ? 'Edit the item' : 'Add an item'}
          disabled={isSubmitting || !hasTodoText}
        >
          {editingItem ? (
            <HiMiniCheckCircle size={buttonBig} />
          ) : (
            <HiMiniPlusCircle size={buttonBig} />
          )}
        </button>
      </div>
    </form>
  );
}

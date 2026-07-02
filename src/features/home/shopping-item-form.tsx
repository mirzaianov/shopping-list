'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { HiMiniCheckCircle, HiMiniPlusCircle } from 'react-icons/hi2';
import buttonStyles from '../../components/button.module.css';
import inputStyles from '../../components/list-input-view.module.css';
import { createShoppingItemAction, updateShoppingItemAction } from './shopping-list-actions';
import { type ShoppingItemFormValues, shoppingItemSchema } from './shopping-item-schemas';
import { useShoppingListStore } from './shopping-list-store';
import styles from './home.module.css';

const buttonBig = 48;

export default function ShoppingItemForm() {
  const editingItem = useShoppingListStore((state) => state.editingItem);
  const cancelEdit = useShoppingListStore((state) => state.cancelEdit);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ShoppingItemFormValues>({
    resolver: zodResolver(shoppingItemSchema),
    defaultValues: { todo: '' },
  });

  useEffect(() => {
    reset({ todo: editingItem?.todo ?? '' });
  }, [editingItem, reset]);

  const onSubmit = handleSubmit(async ({ todo }) => {
    const result = editingItem
      ? await updateShoppingItemAction(editingItem.id, todo)
      : await createShoppingItemAction(todo);

    if (result.error) {
      setError('root', { message: result.error });
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
          className={`${buttonStyles.button} ${inputStyles.actionButton}`}
          type="submit"
          title={editingItem ? 'Edit the item' : 'Add an item'}
          disabled={isSubmitting}
        >
          {editingItem ? (
            <HiMiniCheckCircle size={buttonBig} />
          ) : (
            <HiMiniPlusCircle size={buttonBig} />
          )}
        </button>
      </div>
      {(errors.todo?.message || errors.root?.message) && (
        <p className={styles.error}>{errors.todo?.message ?? errors.root?.message}</p>
      )}
    </form>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { CirclePlus } from 'lucide-react';
import buttonStyles from '../../components/button.module.css';
import { createShoppingItemAction } from './shopping-list-actions';
import { type ShoppingItemFormValues, shoppingItemSchema } from './shopping-item-schemas';
import styles from './home.module.css';
import inputStyles from './shopping-item-form.module.css';

const buttonBig = 48;

export default function ShoppingItemForm() {
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

  const onSubmit = handleSubmit(async ({ todo }) => {
    const result = await createShoppingItemAction(todo);

    if (result.error) {
      return;
    }

    reset({ todo: '' });
    router.refresh();
  });

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.formRow}>
        <input
          required
          className={inputStyles.input}
          type="text"
          placeholder="Add an item"
          {...register('todo')}
        />
        <button
          className={clsx(buttonStyles.button, inputStyles.actionButton)}
          type="submit"
          title="Add an item"
          disabled={isSubmitting || !hasTodoText}
        >
          <CirclePlus size={buttonBig} />
        </button>
      </div>
    </form>
  );
}

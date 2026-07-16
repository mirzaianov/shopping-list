'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { CirclePlus } from 'lucide-react';
import { toast } from 'sonner';
import Button from '../../components/button';
import buttonStyles from '../../components/button.module.css';
import { createShoppingItemAction } from './shopping-list-actions';
import { type ShoppingItemFormValues, shoppingItemSchema } from './shopping-item-schemas';
import styles from './home.module.css';
import inputStyles from './shopping-item-form.module.css';

const iconSize = 20;

export default function ShoppingItemForm() {
  const router = useRouter();
  const { register, handleSubmit, reset, setFocus, watch } = useForm<ShoppingItemFormValues>({
    resolver: zodResolver(shoppingItemSchema),
    defaultValues: { todo: '' },
  });
  const todoValue = watch('todo');
  const hasTodoText = todoValue.trim().length > 0;
  const createItemMutation = useMutation({
    mutationFn: createShoppingItemAction,
  });

  useEffect(() => {
    setFocus('todo');
  }, [setFocus]);

  const onSubmit = handleSubmit(async ({ todo }) => {
    try {
      const result = await createItemMutation.mutateAsync(todo);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success('Item added');
      reset({ todo: '' });
      router.refresh();
    } catch {
      toast.error('Item could not be added. Please try again.');
    }
  });

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.formRow}>
        <input
          required
          className={inputStyles.input}
          type="text"
          placeholder="Enter item"
          {...register('todo')}
        />
        <Button
          disabled={createItemMutation.isPending || !hasTodoText}
          icon={<CirclePlus size={iconSize} />}
          loading={createItemMutation.isPending}
          styling={clsx(buttonStyles.standard, buttonStyles.primary, inputStyles.addButton)}
          text="Add"
          title="Add an item"
          type="submit"
        />
      </div>
    </form>
  );
}

'use client';

import { Field } from '@base-ui/react/field';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { CirclePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import Button from '../../components/button';
import { toast } from '../../components/toast-provider';
import { shoppingItemSchema } from './shopping-item-schemas';
import type { ShoppingItemFormValues } from './shopping-item-schemas';
import { createShoppingItemAction } from './shopping-list-actions';

import buttonStyles from '../../components/button.module.css';
import styles from './home.module.css';
import inputStyles from './shopping-item-form.module.css';

const iconSize = 20;

export default function ShoppingItemForm() {
  const router = useRouter();
  const { control, handleSubmit, reset, setFocus } = useForm<ShoppingItemFormValues>({
    defaultValues: { todo: '' },
    resolver: zodResolver(shoppingItemSchema),
  });
  const todoValue = useWatch({ control, name: 'todo' });
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
        <Controller
          control={control}
          name="todo"
          render={({
            field: { name, onBlur, onChange, ref, value },
            fieldState: { invalid, isDirty, isTouched },
          }) => (
            <Field.Root
              className={inputStyles.field}
              dirty={isDirty}
              invalid={invalid}
              name={name}
              touched={isTouched}
            >
              <Field.Label className={inputStyles.visuallyHidden}>Item</Field.Label>
              <Field.Control
                required
                className={inputStyles.input}
                onBlur={onBlur}
                onValueChange={onChange}
                placeholder="Enter item"
                ref={ref}
                type="text"
                value={value}
              />
            </Field.Root>
          )}
        />
        <Button
          disabled={createItemMutation.isPending || !hasTodoText}
          icon={<CirclePlus size={iconSize} />}
          loading={createItemMutation.isPending}
          styling={clsx(buttonStyles.standard, buttonStyles.primary, inputStyles.addButton)}
          text="Add"
          type="submit"
        />
      </div>
    </form>
  );
}

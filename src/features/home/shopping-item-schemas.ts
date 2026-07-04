import { z } from 'zod';

export const shoppingItemSchema = z.object({
  todo: z.string().trim().min(1, 'Please enter a todo'),
});

export const shoppingItemIdSchema = z.object({
  id: z.string().min(1, 'Missing item id'),
});

export const shoppingItemOrderSchema = z.object({
  ids: z.array(z.string().min(1, 'Missing item id')).min(1, 'Missing item order'),
});

export const shoppingItemWithIdSchema = shoppingItemSchema.extend(shoppingItemIdSchema.shape);

export type ShoppingItemFormValues = z.infer<typeof shoppingItemSchema>;

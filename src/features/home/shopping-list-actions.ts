'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { auth } from '../../lib/auth';
import {
  createShoppingItem,
  deleteShoppingItem,
  listShoppingItems,
  reorderShoppingItems,
  updateShoppingItem,
} from '../../db/queries';
import {
  shoppingItemIdSchema,
  shoppingItemOrderSchema,
  shoppingItemSchema,
  shoppingItemWithIdSchema,
} from './shopping-item-schemas';

type ActionResult = {
  error?: string;
};

const getUserId = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user.id ?? null;
};

export const createShoppingItemAction = async (todo: string): Promise<ActionResult> => {
  const parsed = shoppingItemSchema.safeParse({ todo });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid todo' };
  }

  const userId = await getUserId();
  if (!userId) {
    return { error: 'Please sign in again.' };
  }

  const todos = await listShoppingItems(userId);
  const hasDuplicate = todos.some(
    (item) => item.todo.toLowerCase() === parsed.data.todo.toLowerCase(),
  );
  if (hasDuplicate) {
    return { error: 'Todo already exists' };
  }

  await createShoppingItem(userId, parsed.data.todo);
  revalidatePath('/');
  return {};
};

export const updateShoppingItemAction = async (id: string, todo: string): Promise<ActionResult> => {
  const parsed = shoppingItemWithIdSchema.safeParse({ id, todo });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid todo' };
  }

  const userId = await getUserId();
  if (!userId) {
    return { error: 'Please sign in again.' };
  }

  await updateShoppingItem(userId, parsed.data.id, parsed.data.todo);
  revalidatePath('/');
  return {};
};

export const deleteShoppingItemAction = async (id: string): Promise<ActionResult> => {
  const parsed = shoppingItemIdSchema.safeParse({ id });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid item' };
  }

  const userId = await getUserId();
  if (!userId) {
    return { error: 'Please sign in again.' };
  }

  await deleteShoppingItem(userId, parsed.data.id);
  revalidatePath('/');
  return {};
};

export const deleteShoppingItemFormAction = async (formData: FormData): Promise<void> => {
  await deleteShoppingItemAction(String(formData.get('id') ?? ''));
};

export const reorderShoppingItemsAction = async (ids: string[]): Promise<ActionResult> => {
  const parsed = shoppingItemOrderSchema.safeParse({ ids });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid item order' };
  }

  const userId = await getUserId();
  if (!userId) {
    return { error: 'Please sign in again.' };
  }

  const updated = await reorderShoppingItems(userId, parsed.data.ids);
  if (!updated) {
    return { error: 'Todo order could not be saved. Please refresh and try again.' };
  }

  revalidatePath('/');
  return {};
};

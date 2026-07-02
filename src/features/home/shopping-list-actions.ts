'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { auth } from '../../lib/auth';
import {
  createShoppingItem,
  deleteShoppingItem,
  listShoppingItems,
  updateShoppingItem,
} from '../../db/queries';

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
  const trimmedTodo = todo.trim();
  if (!trimmedTodo) {
    return { error: 'Please enter a todo' };
  }

  const userId = await getUserId();
  if (!userId) {
    return { error: 'Please sign in again.' };
  }

  const todos = await listShoppingItems(userId);
  const hasDuplicate = todos.some((item) => item.todo.toLowerCase() === trimmedTodo.toLowerCase());
  if (hasDuplicate) {
    return { error: 'Todo already exists' };
  }

  await createShoppingItem(userId, trimmedTodo);
  revalidatePath('/');
  return {};
};

export const updateShoppingItemAction = async (id: string, todo: string): Promise<ActionResult> => {
  const trimmedTodo = todo.trim();
  if (!trimmedTodo) {
    return { error: 'Please enter a todo' };
  }

  const userId = await getUserId();
  if (!userId) {
    return { error: 'Please sign in again.' };
  }

  await updateShoppingItem(userId, id, trimmedTodo);
  revalidatePath('/');
  return {};
};

export const deleteShoppingItemAction = async (id: string): Promise<ActionResult> => {
  const userId = await getUserId();
  if (!userId) {
    return { error: 'Please sign in again.' };
  }

  await deleteShoppingItem(userId, id);
  revalidatePath('/');
  return {};
};

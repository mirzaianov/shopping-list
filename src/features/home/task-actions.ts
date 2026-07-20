'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { createTask, deleteTask, listTasks, reorderTasks, updateTask } from '../../db/queries';
import { auth } from '../../lib/auth';
import { taskIdSchema, taskOrderSchema, taskSchema, taskWithIdSchema } from './task-schemas';

interface ActionResult {
  error?: string;
}

const getUserId = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user.id ?? null;
};

export const createTaskAction = async (title: string): Promise<ActionResult> => {
  const parsed = taskSchema.safeParse({ title });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid task' };
  }

  const userId = await getUserId();

  if (!userId) {
    return { error: 'Please sign in again.' };
  }

  const tasks = await listTasks(userId);
  const hasDuplicate = tasks.some(
    (task) => task.title.toLowerCase() === parsed.data.title.toLowerCase(),
  );

  if (hasDuplicate) {
    return { error: 'Task already exists' };
  }

  await createTask(userId, parsed.data.title);
  revalidatePath('/');

  return {};
};

export const updateTaskAction = async (id: string, title: string): Promise<ActionResult> => {
  const parsed = taskWithIdSchema.safeParse({ id, title });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid task' };
  }

  const userId = await getUserId();

  if (!userId) {
    return { error: 'Please sign in again.' };
  }

  await updateTask(userId, parsed.data.id, parsed.data.title);
  revalidatePath('/');

  return {};
};

export const deleteTaskAction = async (id: string): Promise<ActionResult> => {
  const parsed = taskIdSchema.safeParse({ id });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid task' };
  }

  const userId = await getUserId();

  if (!userId) {
    return { error: 'Please sign in again.' };
  }

  await deleteTask(userId, parsed.data.id);
  revalidatePath('/');

  return {};
};

export const reorderTasksAction = async (ids: string[]): Promise<ActionResult> => {
  const parsed = taskOrderSchema.safeParse({ ids });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid task order' };
  }

  const userId = await getUserId();

  if (!userId) {
    return { error: 'Please sign in again.' };
  }

  const updated = await reorderTasks(userId, parsed.data.ids);

  if (!updated) {
    return {
      error: 'Task order could not be saved. Please refresh and try again.',
    };
  }

  revalidatePath('/');

  return {};
};

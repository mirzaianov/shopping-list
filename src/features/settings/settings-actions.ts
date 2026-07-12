'use server';

import { and, eq, ne } from 'drizzle-orm';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { auth } from '../../lib/auth';
import { nicknameSchema } from '../../lib/auth-nickname';
import { db } from '../../db/client';
import { user } from '../../db/schema';

type ActionResult = {
  error?: string;
};

export const updateNicknameAction = async (nickname: string): Promise<ActionResult> => {
  const parsed = nicknameSchema.safeParse(nickname);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid nickname' };
  }

  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session) {
    return { error: 'Please sign in again.' };
  }

  const duplicate = await db
    .select({ id: user.id })
    .from(user)
    .where(and(eq(user.name, parsed.data), ne(user.id, session.user.id)))
    .limit(1);
  if (duplicate.length > 0) {
    return { error: 'Nickname is already in use.' };
  }

  try {
    await auth.api.updateUser({
      body: { name: parsed.data },
      headers: requestHeaders,
    });
  } catch {
    return { error: 'Nickname could not be updated. Please try again.' };
  }

  revalidatePath('/');
  revalidatePath('/settings');
  return {};
};

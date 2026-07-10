'use server';

import { eq } from 'drizzle-orm';
import { db } from '../../db/client';
import { user } from '../../db/schema';
import { nicknameSchema } from '../../lib/auth-nickname';

type NicknameAvailability = {
  available: boolean;
  error?: string;
};

export const isNicknameAvailableAction = async (
  nickname: string,
): Promise<NicknameAvailability> => {
  const parsed = nicknameSchema.safeParse(nickname);
  if (!parsed.success) {
    return {
      available: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid nickname',
    };
  }

  const [existingUser] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.name, parsed.data))
    .limit(1);

  return { available: !existingUser };
};

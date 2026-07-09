import { z } from 'zod';

export const nicknameSchema = z
  .string()
  .trim()
  .min(3, 'Nickname is too short')
  .max(32, 'Nickname is too long')
  .regex(/^[a-z0-9_-]+$/, 'Use lowercase letters, numbers, "-" or "_"');

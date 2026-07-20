import { z } from 'zod';

import { nicknameSchema } from '../../lib/auth-nickname.ts';
import { authPasswordPolicy } from '../../lib/auth-policy.ts';

export const signInSchema = z.object({
  email: z.string().trim().email('Enter a valid email'),
  password: z.string().min(1, 'Enter your password'),
});

export const signUpSchema = z
  .object({
    confirmEmail: z.string().trim().email('Enter a valid email'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
    email: z.string().trim().email('Enter a valid email'),
    nickname: nicknameSchema,
    password: z
      .string()
      .min(1, 'Enter your password')
      .min(authPasswordPolicy.minLength, 'Password is too short')
      .max(authPasswordPolicy.maxLength, 'Password is too long'),
  })
  .refine((values) => values.email === values.confirmEmail, {
    message: 'Emails must match',
    path: ['confirmEmail'],
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;

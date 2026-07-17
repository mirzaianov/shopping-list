import { z } from 'zod';
import { nicknameSchema } from '../../lib/auth-nickname';
import { authPasswordPolicy } from '../../lib/auth-policy';

export const signInSchema = z.object({
  email: z.string().trim().email('Enter a valid email'),
  password: z.string().min(1, 'Enter your password'),
});

export const signUpSchema = z
  .object({
    nickname: nicknameSchema,
    email: z.string().trim().email('Enter a valid email'),
    password: z
      .string()
      .min(1, 'Enter your password')
      .min(authPasswordPolicy.minLength, 'Password is too short')
      .max(authPasswordPolicy.maxLength, 'Password is too long'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;

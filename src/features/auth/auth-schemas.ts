import { z } from 'zod';

const passwordMinLength = 8;
const passwordMaxLength = 128;

export const signInSchema = z.object({
  email: z.string().trim().email('Enter a valid email'),
  password: z.string().min(1, 'Enter your password'),
});

export const signUpSchema = z
  .object({
    email: z.string().trim().email('Enter a valid email'),
    confirmEmail: z.string().trim().email('Enter a valid email'),
    password: z
      .string()
      .min(1, 'Enter your password')
      .min(passwordMinLength, 'Password is too short')
      .max(passwordMaxLength, 'Password is too long'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((values) => values.email === values.confirmEmail, {
    path: ['confirmEmail'],
    message: 'Emails must match',
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;

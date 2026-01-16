import { z } from 'zod';

const noroffEmail = z
  .string()
  .trim()
  .email('Please enter a valid email address')
  .refine((email) => email.toLowerCase().endsWith('@stud.noroff.no'), {
    message: 'Email must be a @stud.noroff.no address',
  });

export const loginSchema = z.object({
  email: noroffEmail,
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  name: z.string().trim().min(4, 'Username must be at least 4 characters'),
  email: noroffEmail,
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

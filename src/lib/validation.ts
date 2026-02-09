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

export const venueSchema = z.object({
  name: z.string().trim().min(1, 'Your venue needs a name'),
  description: z.string().trim().min(1, 'Please describe your venue'),
  maxGuests: z.coerce
    .number()
    .int('Max guests must be a whole number')
    .min(1, 'Max guests must be at least 1')
    .max(100, 'A venue cannot accomodate more than 100 guests'),
  price: z.coerce
    .number()
    .int('Price must be a whole number')
    .min(1, 'Price must be greater than 1')
    .max(10000, 'A venue cannot cost more than 10 000'),
});

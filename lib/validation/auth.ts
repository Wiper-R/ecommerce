import { z } from 'zod';
import { zodExtended } from '../zod-extended';

export const CreateUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  password: zodExtended.password(),
  email: z.string().email('Enter a valid email')
});

export type CreateUserSchema = z.infer<typeof CreateUserSchema>;

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required')
});

export type LoginUserSchema = z.infer<typeof LoginUserSchema>;

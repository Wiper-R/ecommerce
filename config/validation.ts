import { z } from 'zod';

export const configSchema = z.object({
  DATABASE_URL: z.string().url(),
  DATABASE_NAME: z.string()
});

export const clientConfigSchema = z.object({});

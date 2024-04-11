'use server';

import { z } from 'zod';

const configSchema = z.object({
  AUTH_SECRET: z.string(),
  TOKEN_KEY: z.string()
});

const config = configSchema.parse(process.env);

export default config;

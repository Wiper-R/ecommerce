import { z } from 'zod';

const configSchema = z.object({
  JWT_SECRET: z.string(),
  JWT_TOKEN_KEY: z.string()
});

const config = configSchema.parse(process.env);

export default config;

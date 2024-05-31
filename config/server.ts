import { z } from 'zod';

const configSchema = z.object({
  AUTH_SECRET: z.string(),
  TOKEN_KEY: z.string(),
  CHECKOUT_COOKIE_KEY: z.string().default('checkout'),
  RAZORPAY_KEY_ID: z.string(),
  RAZORPAY_KEY_SECRET: z.string()
});

const config = configSchema.parse(process.env);

export default config;

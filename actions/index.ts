'use server';

import prisma from '@/prisma/db';
import * as bcrpyt from 'bcrypt';
import { z } from 'zod';

const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string()
});

function sleep(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay * 1000);
  });
}

export async function createUser(data: unknown) {
  const fields = createUserSchema.safeParse(data);
  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors
    };
  }
  const password = await bcrpyt.hash(fields.data.password, 12);
  const user = await prisma.user.create({
    data: {
      firstName: fields.data.firstName,
      lastName: fields.data.lastName,
      email: fields.data.email,
      credentials: { create: { password } }
    }
  });
  await sleep(4);

  return user;
}

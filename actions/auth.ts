'use server';

import prisma from '@/prisma/db';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { CreateUserSchema, LoginUserSchema } from '@/lib/validation/auth';
import { logSession } from '@/auth/session';

export async function createUser(data: CreateUserSchema) {
  try {
    // TODO: change salt
    var password = await bcrypt.hash(data.password, 12);
    var user = await prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        credentials: { create: { password } }
      }
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code == 'P2002') {
        return { error: 'Email already exists' };
      }
    }

    console.error(e);
    return { error: 'Something went wrong' };
  }

  return user;
}

export async function loginUser(data: LoginUserSchema) {
  try {
    var user = await prisma.user.findFirst({
      where: { email: data.email },
      include: { credentials: { select: { password: true } } }
    });
  } catch (e) {
    console.error(e);
    return { error: 'Something went wrong' };
  }

  if (!user || !user.credentials) {
    // TODO: Throw a error
    return { error: 'Invalid email or password' };
  }

  const match = await bcrypt.compare(data.password, user.credentials.password);

  if (!match) {
    // TODO: Throw a error
    return { error: 'Invalid email or password' };
  }

  const { credentials, ...safe } = user;
  await logSession(user.id);
  return safe;
}

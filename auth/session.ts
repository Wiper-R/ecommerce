import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import prisma from '@/prisma/db';
import { TSession } from './contexts/session-context';
import config from '@/config/server';

export const dynamic = 'force-dynamic';

export const getSession = async (): Promise<TSession> => {
  const token = cookies().get(config.TOKEN_KEY);
  if (!token || !token.value) return null;
  const session = await verifySession(token.value);
  if (!session?.payload.sub) return null;
  const user = await prisma.user.findFirst({
    where: { id: session.payload.sub }
  });
  if (!user) return null;
  return { user };
};

export const verifySession = async (token: string) => {
  if (!token) return null;
  const secret = new TextEncoder().encode(config.AUTH_SECRET);
  return await jwtVerify(token, secret);
};

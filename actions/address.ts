'use server';

import { getSession } from '@/auth';
import prisma from '@/prisma/db';
type AddAddressProps = {
  pincode: number;
  houseNo: string;
  area: string;
  landmark?: string;
  city: string;
  state: string;
};

export async function addAddress(props: AddAddressProps) {
  const session = await getSession();
  if (!session || !session.user) return null;
  return await prisma.address.upsert({
    where: { userId: session.user.id },
    create: { ...props, userId: session.user.id },
    update: { ...props, userId: session.user.id }
  });
}

export async function getRecentAddress() {
  const session = await getSession();
  if (!session || !session.user) return null;
  return await prisma.address.findFirst({
    where: { userId: session.user.id },
    orderBy: { lastUsed: 'desc' }
  });
}

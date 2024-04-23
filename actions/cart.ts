'use server';
import { getSession } from '@/auth';
import prisma from '@/prisma/db';
import { revalidatePath } from 'next/cache';

export async function addProductToCart(productId: string, amount: number) {
  const session = await getSession();
  if (!session || !session.user) return null;
  const cart = await prisma.cart.create({
    data: { productId, amount, userId: session.user.id }
  });
  revalidatePath('/cart');
  return cart;
}

export async function getCartItems() {
  const session = await getSession();
  if (!session || !session.user) return null;
  return await prisma.cart.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });
}

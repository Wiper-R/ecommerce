'use server';
import { getSession } from '@/auth';
import config from '@/config/server';
import prisma from '@/prisma/db';
import { Cart, Prisma } from '@prisma/client';
import moment from 'moment';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { Product, getProduct } from './products';

export async function addProductToCart(productId: string, amount: number) {
  const session = await getSession();
  if (!session || !session.user) return null;
  try {
    await prisma.cart.create({
      data: { productId, amount, userId: session.user.id }
    });
    return true;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code == 'P2002') {
        await prisma.cart.update({
          where: { userId_productId: { userId: session.user.id, productId } },
          data: { amount: { increment: 1 } }
        });
        return true;
      }

      throw e;
    }
  } finally {
    revalidatePath('/cart');
  }
}

export type CartWithProduct = {
  product: Product;
} & Cart;

export async function getCartItems() {
  const session = await getSession();
  if (!session || !session.user) return null;
  const carts = await prisma.cart.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });

  const _newCarts = [];

  for (let cart of carts) {
    const product = await getProduct(cart.productId);
    if (!product) continue;
    _newCarts.push({ ...cart, product });
  }

  return _newCarts;
}

export async function updateCart(
  id: string,
  update: { amount?: number; selected?: boolean }
) {
  const updated = await prisma.cart.update({
    where: { id },
    data: {
      selected: update.selected,
      amount: update.amount
    }
  });
  revalidatePath('/cart');
  return updated;
}

export async function getCartByProductId(productId: string) {
  const session = await getSession();
  if (!session || !session.user) return null;
  return await prisma.cart.findFirst({
    where: { productId, userId: session.user.id }
  });
}

export async function removeCart(id: string) {
  const session = await getSession();
  if (!session || !session.user) return null;
  revalidatePath('/cart');
  return await prisma.cart.delete({ where: { id, userId: session.user.id } });
}

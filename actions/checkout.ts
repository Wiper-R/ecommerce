'use server';

import config from '@/config/server';
import prisma from '@/prisma/db';
import moment from 'moment';
import { cookies } from 'next/headers';
import { Product, getProduct } from './products';
import { getSession } from '@/auth';

type ProductData = {
  productId: string;
  amount: number;
};

export async function prepareForCheckout(data: ProductData[]) {
  if (data.length == 0) return null;
  const session = await getSession();
  if (!session || !session.user) return null;
  const expires = moment().add({ hours: 1 }).toDate();
  const checkoutInfo = await prisma.checkoutInfo.create({
    data: { data, userId: session.user.id }
  });
  cookies().set(config.CHECKOUT_COOKIE_KEY, checkoutInfo.id, {
    httpOnly: true,
    sameSite: 'strict',
    expires
  });
  return checkoutInfo;
}

export type CheckoutInfo = ProductData & { product: Product };

export async function getCheckoutInfo(id: string) {
  const session = await getSession();
  if (!session || !session.user) return null;
  const info = await prisma.checkoutInfo.findFirst({
    where: { id, userId: session.user.id }
  });
  if (!info) return null;
  const _info: (ProductData & { product: Product })[] = [];

  for (let item of info.data as ProductData[]) {
    const product = await getProduct(item.productId);
    if (!product) continue;
    _info.push({ ...item, product });
  }
  if (!_info.length) return null;
  return _info;
}

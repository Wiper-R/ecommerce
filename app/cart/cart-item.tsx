'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { CartDetails } from './cart-details';
import { CartWithProduct, updateCart } from '@/actions/cart';
import { Checkbox } from '@/components/ui/checkbox';

export const CartItem = ({ cart }: { cart: CartWithProduct }) => {
  return (
    <Card className="flex gap-6 p-4 items-center">
      <Checkbox
        defaultChecked={cart.selected}
        onCheckedChange={async (c) => {
          await updateCart(cart.id, {
            selected: c == 'indeterminate' ? cart.selected : c
          });
        }}
      />
      <Image
        src={cart.product.image}
        width={100}
        height={100}
        alt=""
        className="shrink-0 size-24 object-contain"
      />
      <div>
        <h4 className="text-xl font-medium">
          <Link href={`/products/${cart.productId}`}>{cart.product.title}</Link>
        </h4>
        {/* Todo: Show this properly */}
        <span className="text-lime-600">in stock</span>
        <CartDetails id={cart.id} amount={cart.amount} />
      </div>
    </Card>
  );
};

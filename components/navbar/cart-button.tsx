import Link from 'next/link';

import { buttonVariants } from '../ui/button';
import { ShoppingCartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCartItems } from '@/actions/cart';

// TODO: make items required
export async function CartButton() {
  const items = await getCartItems();
  const count = items && items.reduce((pv, cv) => pv + cv.amount, 0);

  return (
    <Link
      href="/cart"
      className={buttonVariants({
        variant: 'secondary',
        className: 'gap-2 relative'
      })}
    >
      <ShoppingCartIcon className="w-5" />
      <span>Cart</span>
      <span
        className={cn(
          'rounded-full size-6 inline-flex items-center justify-center absolute text-xs -right-2 -bottom-2 bg-primary text-primary-foreground',
          !count && 'hidden'
        )}
      >
        {count}
      </span>
    </Link>
  );
}

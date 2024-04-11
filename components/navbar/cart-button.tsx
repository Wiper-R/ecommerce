import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { ShoppingCartIcon } from 'lucide-react';

export function CartButton() {
  return (
    <div className="relative">
      <Link
        href="/cart"
        className={buttonVariants({
          variant: 'secondary',
          class: 'gap-2'
        })}
      >
        <ShoppingCartIcon className="w-5" />
        <span>Cart</span>
      </Link>
      <span className="rounded-full size-6 inline-flex items-center justify-center absolute text-xs -right-2 -bottom-2 bg-primary text-primary-foreground">
        4
      </span>
    </div>
  );
}

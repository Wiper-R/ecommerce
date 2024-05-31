import { Product } from '@/actions/products';
import { cn, formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="shrink-0
    snap-always snap-start"
    >
      <div className="grid place-items-center rounded p-5 gap-4">
        <Image
          src={product.image}
          height={160}
          width={160}
          alt=""
          className="object-contain w-40 h-40"
        />
        <div className="text-center">
          <p className="text-lg font-semibold line-clamp-2">{product.title}</p>
          <div
            className={cn(
              'mt-5',
              { 'text-xl': product.price.payable },
              { 'text-destructive': !product.price.payable }
            )}
          >
            {product.price.payable
              ? formatCurrency(parseInt(product.price.payable))
              : 'Currently Unavailable'}
          </div>
        </div>
      </div>
    </Link>
  );
}

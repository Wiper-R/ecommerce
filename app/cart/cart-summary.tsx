import { CartWithProduct } from '@/actions/cart';
import { prepareForCheckout } from '@/actions/checkout';
import { getProduct } from '@/actions/products';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import { Cart } from '@prisma/client';
import { redirect } from 'next/navigation';

export async function CartSummary({
  cartItems
}: {
  cartItems: CartWithProduct[];
}) {
  var total = 0;
  for (let item of cartItems) {
    if (item.selected && item.product?.price.payable)
      total += parseInt(item.product?.price.payable) * item.amount;
  }

  const items = cartItems
    .filter((cart) => cart.selected)
    .map((cart) => {
      return { productId: cart.productId, amount: cart.amount };
    });

  return (
    <form
      action={async () => {
        'use server';
        const created = await prepareForCheckout(items);
        if (created == null) {
          return;
        }
        redirect('/checkout');
      }}
    >
      <Card className="p-4 h-fit">
        <div className="font-medium text-lg">Cart Subtotal</div>
        <Separator className="my-2" />
        <div>
          <span>Total: </span> <span>{formatCurrency(total)}</span>
        </div>
        {total ? (
          <Button className={buttonVariants({ className: 'mt-10' })}>
            Proceed to checkout
          </Button>
        ) : null}
      </Card>
    </form>
  );
}

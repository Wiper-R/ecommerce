'use client';

import { removeCart, updateCart } from '@/actions/cart';
import { Button } from '@/components/ui/button';
import { LucideIcon, MinusIcon, PlusIcon } from 'lucide-react';

function ActionButton({
  id,
  icon: Icon,
  amount
}: {
  id: string;
  icon: LucideIcon;
  amount: number;
}) {
  const handleClick = async () => {
    if (amount == 0) {
      await removeCart(id);
    } else {
      await updateCart(id, { amount });
    }
  };
  return (
    <Button
      variant="outline"
      size="icon"
      type="button"
      className="size-8"
      onClick={handleClick}
    >
      <Icon className="w-3" />
    </Button>
  );
}

export function CartDetails({ id, amount }: { id: string; amount: number }) {
  return (
    <div className="mt-4 flex items-center gap-4">
      <ActionButton icon={MinusIcon} amount={amount - 1} id={id} />
      <span className="text-sm font-semibold">{amount}</span>
      <ActionButton icon={PlusIcon} amount={amount + 1} id={id} />
      <Button
        variant="link"
        size="sm"
        className="text-destructive"
        onClick={async () => await removeCart(id)}
      >
        delete
      </Button>
    </div>
  );
}

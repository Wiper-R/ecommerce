import { CheckoutInfo } from '@/actions/checkout';
import { MakePaymentButton } from '@/components/make-payment-button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';

export function CheckoutSummary({
  checkoutInfo
}: {
  checkoutInfo: CheckoutInfo[];
}) {
  const total = checkoutInfo.reduce(
    (p, c) => p + parseInt(c.product.price.payable || '') * c.amount,
    0
  );
  return (
    <Card className="p-8 h-fit">
      <h2 className="text-xl font-bold">Checkout Summary</h2>
      <Separator className="my-4" />
      <div className="text-lg grid grid-cols-2">
        <span className="font-medium mr-2 text-gray-600">Price: </span>
        <span className="tracking-wide text-end">{formatCurrency(total)}</span>
      </div>
      <div className="text-lg grid grid-cols-2">
        <span className="font-medium mr-2 text-gray-600">Discount: </span>
        <span className="tracking-wide text-end">-{formatCurrency(total)}</span>
      </div>
      <div className="text-lg grid grid-cols-2">
        <span className="font-medium mr-2 text-gray-600">Total Payable: </span>
        <span className="tracking-wide text-end">0</span>
      </div>
      <MakePaymentButton label="Checkout" amount={total} />
    </Card>
  );
}

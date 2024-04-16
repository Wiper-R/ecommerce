'use client';

import { createOrder } from '@/actions/payment';
import { Button } from '@/components/ui/button';
import Script from 'next/script';

export function MakePaymentButton({ amount }: { amount: number }) {
  const makePayment = async ({ productId = null }) => {
    const data = await createOrder({ amount });
    const options = {
      name: 'Your Purchase',
      currency: data.currency,
      order_id: data.id,
      description: data.description
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();

    paymentObject.on('payment.failed', function (response: unknown) {
      console.log(response);
      alert('Payment failed. Please try again. Contact support for help');
    });
  };
  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      ;<Button onClick={() => makePayment({})}>Make Payment ₹{amount}</Button>
    </>
  );
}

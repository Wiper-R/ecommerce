'use client';

import { createOrder, verifySignature } from '@/actions/payment';
import { Button } from '@/components/ui/button';
import { redirect, useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

export function MakePaymentButton({
  label,
  amount
}: {
  label: string;
  amount: number;
}) {
  const [disabled, setDisabled] = useState(true);
  const razorpay = useRef<any>();
  const router = useRouter();
  useEffect(() => {
    const create = async () => {
      const data = await createOrder({ amount });
      const options = {
        name: 'Your Order',
        handler: async function (response: any) {
          const valid = await verifySignature(response);
          if (valid) {
            const params = new URLSearchParams();
            params.set('orderId', response.razorpay_order_id);
            router.push(`/order-summary?` + params.toString());
          }
        },
        currency: data.currency,
        order_id: data.id,
        description: data.description
      };
      razorpay.current = new (window as any).Razorpay(options);
      setDisabled(false);
    };
    create();
  }, []);
  const makePayment = async () => {
    razorpay.current?.open();
    razorpay.current?.on('payment.failed', (response: unknown) => {
      alert('Payment failed. Please try again. Contact support for help');
    });
  };
  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Button onClick={() => makePayment()} disabled={disabled}>
        {label}
      </Button>
    </>
  );
}

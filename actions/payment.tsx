'use server';
import config from '@/config/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
});

export async function createOrder({ amount }: { amount: number }) {
  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: 'random_id',
    payment_capture: 1
  };
  const order = await razorpay.orders.create(options);
  return order;
}

export async function verifySignature({
  razorpay_order_id,
  razorpay_signature,
  razorpay_payment_id
}: {
  razorpay_order_id: string;
  razorpay_signature: string;
  razorpay_payment_id: string;
}) {
  const generated = crypto
    .createHmac('sha256', config.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');
  console.log(generated);
  console.log(razorpay_signature);
  return generated == razorpay_signature;
}

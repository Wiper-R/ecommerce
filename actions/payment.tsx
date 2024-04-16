'use server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
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

import { getCheckoutInfo } from '@/actions/checkout';
import { MaxWidthContainer } from '@/components/containers/max-width-container';
import config from '@/config/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { CheckoutSummary } from './checkout-summary';
import { DeliveryInformation } from './delivery-information';
import { getRecentAddress } from '@/actions/address';

export default async function Page() {
  const cookie = cookies().get(config.CHECKOUT_COOKIE_KEY);

  if (cookie) {
    var checkoutInfo = await getCheckoutInfo(cookie.value);
    if (!checkoutInfo) redirect('/');
  } else redirect('/');

  return (
    <MaxWidthContainer className="py-10 px-20 grid grid-cols-[minmax(800px,auto)_400px] gap-10">
      <DeliveryInformation />
      <CheckoutSummary checkoutInfo={checkoutInfo} />
      {/* <MakePaymentButton amount={5000} /> */}
    </MaxWidthContainer>
  );
}

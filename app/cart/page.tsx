import { getCartItems } from '@/actions/cart';
import { getProduct } from '@/actions/products';
import { MaxWidthContainer } from '@/components/containers/max-width-container';
import { redirect } from 'next/navigation';
import { LoginSuccessAction } from '../login/page';
import { CartSummary } from './cart-summary';
import { CartProvider } from './cart-provider';
import { CartItem } from './cart-item';

export default async function Page() {
  const cartItems = await getCartItems();
  const action: LoginSuccessAction = { redirectTo: '/cart' };
  if (!cartItems)
    return redirect(
      `/login?action=${encodeURIComponent(JSON.stringify(action))}`
    );
  return (
    <MaxWidthContainer className="mt-10 grid grid-cols-[minmax(800px,auto)_400px] gap-4">
      <div className="grid gap-4 flex-grow h-fit">
        {cartItems.length ? (
          cartItems.map((cart) => <CartItem cart={cart} key={cart.id} />)
        ) : (
          <div className="text-center p-4">No items in cart</div>
        )}
      </div>
      <CartSummary cartItems={cartItems} />
    </MaxWidthContainer>
  );
}

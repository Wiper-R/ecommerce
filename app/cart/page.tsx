import { getCartItems } from '@/actions/cart';
import { getProduct } from '@/actions/products';
import { MaxWidthContainer } from '@/components/containers/max-width-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LoginSuccessAction } from '../login/page';

const CartItem = async ({
  productId,
  amount
}: {
  productId: string;
  amount: number;
}) => {
  const product = await getProduct(productId);
  if (!product) return null;
  return (
    <Card className="flex gap-4 p-4">
      <Image src={product.image} width={100} height={100} alt="" />
      <div>
        <h4 className="text-xl font-medium">
          <Link href={`/products/${productId}`}>{product.title}</Link>
        </h4>
        <div>
          <Button variant="secondary" size="icon" type="button">
            -
          </Button>
          {amount}
          <Button variant="secondary" size="icon" type="button">
            +
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default async function Page() {
  const cartItems = await getCartItems();
  const action: LoginSuccessAction = { redirectTo: '/cart' };
  if (!cartItems)
    return redirect(
      `/login?action=${encodeURIComponent(JSON.stringify(action))}`
    );
  return (
    <MaxWidthContainer className="grid gap-4 mt-10">
      {cartItems.map((item) => (
        <CartItem
          key={item.productId}
          productId={item.productId}
          amount={item.amount}
        />
      ))}
    </MaxWidthContainer>
  );
}

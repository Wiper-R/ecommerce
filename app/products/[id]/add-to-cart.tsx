'use client';
import { addProductToCart } from '@/actions/cart';
import { LoginSuccessAction } from '@/app/login/page';
import { useSession } from '@/auth';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function AddToCartButton({ productId }: { productId: string }) {
  const router = useRouter();
  const { mutate, mutateAsync, data } = useMutation({
    mutationFn: ({
      productId,
      amount
    }: {
      productId: string;
      amount: number;
    }) => addProductToCart(productId, amount)
  });

  const handleClick = async () => {
    if (!session.data?.user) {
      const action: LoginSuccessAction = {
        addToCart: { productId, amount: 1 },
        redirectTo: '/cart'
      };
      router.push(
        `/login?action=${encodeURIComponent(JSON.stringify(action))}`
      );
      return;
    }
    await mutateAsync({ productId, amount: 1 });
    router.push('/cart');
  };

  const { session } = useSession();
  return (
    <Button size="lg" variant="secondary" onClick={handleClick}>
      Add to Cart
    </Button>
  );
}

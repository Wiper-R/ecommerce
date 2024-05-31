'use client';
import { addProductToCart, getCartByProductId } from '@/actions/cart';
import { LoginSuccessAction } from '@/app/login/page';
import { useSession } from '@/auth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CheckIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function AddToCartButton({ productId }: { productId: string }) {
  const router = useRouter();
  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => await getCartByProductId(productId),
    queryKey: ['product-cart', productId]
  });
  const pathname = usePathname();
  const { toast } = useToast();
  const { mutate, mutateAsync } = useMutation({
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
        redirectTo: pathname
      };
      router.push(
        `/login?action=${encodeURIComponent(JSON.stringify(action))}`
      );
      return;
    }
    await mutateAsync({ productId, amount: 1 });
    refetch();
    toast({ description: 'Added item to cart.' });
  };

  const { session } = useSession();
  return (
    <Button
      size="lg"
      variant="secondary"
      onClick={handleClick}
      disabled={isLoading || Boolean(data)}
    >
      {isLoading ? (
        'Loading...'
      ) : data ? (
        <span className="text-lime-700 inline-flex items-center justify-center">
          <CheckIcon className="w-5 mr-3" /> Added to cart
        </span>
      ) : (
        'Add to cart'
      )}
    </Button>
  );
}

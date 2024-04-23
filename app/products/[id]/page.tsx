import { getProduct } from '@/actions/products';
import { MaxWidthContainer } from '@/components/containers/max-width-container';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToCartButton } from './add-to-cart';

export default async function Page({
  params: { id }
}: {
  params: { id: string };
}) {
  const data = await getProduct(id);
  if (!data) {
    return notFound();
  }

  return (
    <MaxWidthContainer className="flex py-10 gap-10 relative">
      <div className="shrink-0 flex items-center flex-col sticky top-0 h-fit">
        <Image
          src={data.image}
          width={500}
          height={500}
          className="w-[500px] h-[500px] object-contain"
          quality={100}
          alt="product-image"
        />
      </div>
      <div className="relative">
        <h2 className="text-3xl font-bold">{data.title}</h2>
        <div className="my-4 text-2xl font-medium">
          <span data-label="real-price">
            {data.price.payable
              ? `₹ ${data.price.payable}`
              : 'Currently Unavailable'}
          </span>
          <span
            data-label="fake-price"
            className="text-gray-400 line-through ml-4"
          >
            ₹ 89,900
          </span>
        </div>
        <div className="space-x-2 my-4">
          <Link
            className={buttonVariants({ size: 'lg' })}
            href={`/checkout/${data.id}`}
          >
            Buy Now
          </Link>
          <AddToCartButton productId={data.id} />
        </div>

        <h5 className="mt-10 text-xl font-semibold underline">
          Features / Specifications
        </h5>
        <ul className="space-y-4 list-disc mt-4">
          {data.details.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
    </MaxWidthContainer>
  );
}

'use client';

import { getProducts } from '@/actions/products';
import { Card } from './ui/card';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import { ProductCard } from './product-card';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export function ProductsGrid({ heading }: { heading: string }) {
  const { data } = useQuery({
    queryFn: async () => await getProducts(heading as any),
    queryKey: ['products', heading],
    initialData: []
  });
  return (
    <Card className="p-6 mt-10">
      <h4 className="text-xl font-semibold">{heading}</h4>
      <Swiper
        slidesPerView={5}
        modules={[Scrollbar]}
        scrollbar={{
          hide: true
        }}
        className="!pb-4 place-items-start"
      >
        {data.map((product) => (
          <SwiperSlide key={product.title}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  );
}

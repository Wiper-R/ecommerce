import { Category, getProducts } from '@/actions/products';
import { Card } from './ui/card';
import { ProductCard } from './product-card';
import { Separator } from './ui/separator';

export async function ProductsGrid({ category }: { category: Category }) {
  const data = await getProducts(category);
  return (
    <Card className="p-6 mt-10">
      <h4 className="text-xl font-semibold">{category}</h4>
      <Separator orientation="horizontal" className="my-4" />
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(272px,_1fr))]">
        {data.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </Card>
  );
}

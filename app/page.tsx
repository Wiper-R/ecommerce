import { MaxWidthContainer } from '@/components/containers/max-width-container';
import { CategorySelection } from '@/components/category-selection';
import { ProductsGrid } from '@/components/products-grid';

export default function Home() {
  return (
    <MaxWidthContainer className="my-10">
      <CategorySelection />
      <ProductsGrid category="Electronics" />
      <ProductsGrid category="Home & Kitchen" />
      <ProductsGrid category="Groceries" />
      <ProductsGrid category="Fashion" />
      <ProductsGrid category="Watches" />
    </MaxWidthContainer>
  );
}

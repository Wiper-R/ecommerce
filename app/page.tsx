import { MaxWidthContainer } from '@/components/containers/max-width-container';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { CategorySelection } from '@/components/category-selection';
import { ProductsGrid } from '@/components/products-grid';

export default function Home() {
  return (
    <MaxWidthContainer className="my-10">
      <CategorySelection />
      <ProductsGrid heading="Electronics" />
      <ProductsGrid heading="Home & Kitchen" />
      <ProductsGrid heading="Groceries" />
      <ProductsGrid heading="Fashion" />
      <ProductsGrid heading="Watches" />
    </MaxWidthContainer>
  );
}

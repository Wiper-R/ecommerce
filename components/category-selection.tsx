import Electronics from '@/public/assets/categories/electronics.png';
import Mobiles from '@/public/assets/categories/mobiles.png';
import Groceries from '@/public/assets/categories/groceries.png';
import Fashion from '@/public/assets/categories/fashion.webp';
import HomeAndKitchen from '@/public/assets/categories/home-and-kitchen.png';
import Image, { StaticImageData } from 'next/image';
import { MaxWidthContainer } from './containers/max-width-container';
import Link from 'next/link';

function CategoryItem({
  label,
  image
}: {
  label: string;
  image: StaticImageData;
}) {
  // TODO: add valid hyperlinks
  return (
    <Link
      href={`/?category=${label}`}
      className="flex gap-2 shrink-0 py-2 px-4 border rounded items-center"
    >
      <Image
        src={image.src}
        alt={label}
        width={64}
        height={64}
        className="w-8 h-8 object-cover"
      />
      <span className="font-medium text-sm text-center">{label}</span>
    </Link>
  );
}

export function CategorySelection() {
  return (
    <MaxWidthContainer className="overflow-hidden mt-4 px-0">
      <div className="overflow-auto flex mt-2 gap-2 mx-auto pb-2">
        <CategoryItem label="Electronics" image={Electronics} />
        <CategoryItem label="Mobiles" image={Mobiles} />
        <CategoryItem label="Groceries" image={Groceries} />
        <CategoryItem label="Fashion" image={Fashion} />
        <CategoryItem label="Home & Kitchen" image={HomeAndKitchen} />
      </div>
    </MaxWidthContainer>
  );
}

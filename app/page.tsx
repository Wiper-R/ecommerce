import CustomerElectronicsImage from '@/public/assets/customer-electronics.png';
import { Card } from '@/components/ui/card';
import { MaxWidthContainer } from '@/components/containers/max-width-container';
import Link from 'next/link';

export default async function Home() {
  return (
    <MaxWidthContainer className="overflow-hidden mt-4">
      <CategorySelection />
    </MaxWidthContainer>
  );
}

function CategorySelection() {
  return (
    <div className="px-4">
      <div className="overflow-auto flex mt-2 gap-2 mx-auto pb-2">
        <CategoryItem label="Electronics" />
        <CategoryItem label="Decoration" />
        <CategoryItem label="Mobiles" />
        <CategoryItem label="Groceries" />
        <CategoryItem label="Electronics" />
        <CategoryItem label="Decoration" />
        <CategoryItem label="Mobiles" />
        <CategoryItem label="Groceries" />
        <CategoryItem label="Electronics" />
        <CategoryItem label="Decoration" />
        <CategoryItem label="Mobiles" />
        <CategoryItem label="Groceries" />
        <CategoryItem label="Electronics" />
        <CategoryItem label="Decoration" />
        <CategoryItem label="Mobiles" />
        <CategoryItem label="Groceries" />
      </div>
    </div>
  );
}

function CategoryItem({ label }: { label: string }) {
  // TODO: add valid hyperlinks
  return (
    <Link
      href={`/?category=${label}`}
      className="flex gap-2 shrink-0 py-2 px-4 border rounded items-center"
    >
      <img src={CustomerElectronicsImage.src} alt="" className="w-8" />
      <span className="font-medium text-sm text-center">{label}</span>
    </Link>
  );
}

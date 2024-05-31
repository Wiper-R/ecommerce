import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-full flex items-center justify-center">
      You look a bit lost...{' '}
      <Link href="/" className={buttonVariants({ variant: 'link' })}>
        keep shopping
      </Link>
    </div>
  );
}

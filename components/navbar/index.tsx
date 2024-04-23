import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import { getSession } from '@/auth';
import { CartButton } from './cart-button';
import { SearchForm } from './search-form';
import { MaxWidthContainer } from '../containers/max-width-container';

// TODO: break components in part
export async function Navbar() {
  const session = await getSession();
  return (
    <header className="bg-background/40 backdrop-blur sticky top-0 shadow-sm">
      <MaxWidthContainer className="flex justify-between p-4 items-center gap-10">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold italic">
          Kharidify
        </Link>
        <SearchForm />
        <nav>
          <ul className="flex space-x-6 items-center">
            <li className="font-medium flex items-center">
              <CartButton />
            </li>

            {session?.user ? (
              <li className="font-medium">
                <Link
                  href="/account"
                  className={buttonVariants({
                    variant: 'secondary',
                    class: 'gap-2'
                  })}
                >
                  <UserIcon className="w-5" />
                  <span>Account</span>
                </Link>
              </li>
            ) : (
              <li>
                <Link href="/login" className={buttonVariants({})}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </MaxWidthContainer>
    </header>
  );
}

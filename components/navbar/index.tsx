import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import { getSession } from '@/auth';

// TODO: break components in part
export async function Navbar() {
  const session = await getSession();
  return (
    <header className="bg-background/40 backdrop-blur sticky top-0 flex justify-between p-4 shadow-sm items-center gap-10">
      <Link href="/" className="text-lg font-semibold italic">
        Ecommerce
      </Link>
      <form className="flex-grow relative flex">
        <Input type="search" />
        <Button type="submit" variant="secondary" className="absolute right-0">
          <SearchIcon />
        </Button>
      </form>
      <nav>
        <ul className="flex space-x-4 items-center">
          <li className="font-medium flex items-center">
            <Link
              href="/cart"
              className={buttonVariants({
                variant: 'secondary',
                class: 'gap-2'
              })}
            >
              <ShoppingCartIcon className="w-5" />
              <span>Cart</span>
            </Link>
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
    </header>
  );
}

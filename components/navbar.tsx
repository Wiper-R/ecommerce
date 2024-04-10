import Link from 'next/link';

export function Navbar() {
  return (
    <header className="bg-background/40 backdrop-blur sticky top-0 flex justify-between p-4 shadow-sm">
      <Link href="/" className="text-lg font-semibold italic">
        Ecommerce
      </Link>
      <nav>
        <ul className="flex space-x-6">
          <li className="font-medium">
            <a href="">Home</a>
          </li>
          <li className="font-medium">
            <a href="">Categories</a>
          </li>
          <li className="font-medium">
            <a href="">Profile</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

import { SearchIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function SearchForm() {
  return (
    <form className="flex-grow relative flex ml-auto max-w-[400px]">
      <Input
        type="search"
        placeholder="Search for a product"
        className="pr-16"
      />
      <Button type="submit" variant="outline" className="absolute right-0">
        <SearchIcon className="w-5" />
      </Button>
    </form>
  );
}

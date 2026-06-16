// components/ui/SearchInput.tsx
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/app/hooks/useDebounce';


interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  delay?: number;
  defaultValue?: string;
}

export const SearchInput = ({
  onSearch,
  placeholder = 'Search...',
  className,
  delay = 500,
  defaultValue = '',
}: SearchInputProps) => {
  const [query, setQuery] = useState(defaultValue);
  const debouncedQuery = useDebounce(query, delay);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9 pr-9"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
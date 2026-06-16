// components/shop/MobileFilters.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import { FilterContent } from './FilterContent';
import { FiltersProps } from './DesktopFilter';



export const MobileFilters = ({
  sortBy,
  priceRange,
  selectedCategories,
  categories,
  minPrice,
  maxPrice,
  sortOptions,
  onSortChange,
  onPriceChange,
  onCategoryToggle,
  onClearFilters,
  hasActiveFilters,
}: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden px-5">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 h-2 w-2 rounded-full bg-primary" />
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6 px-5">
            <FilterContent
              sortBy={sortBy}
              priceRange={priceRange}
              selectedCategories={selectedCategories}
              categories={categories}
              minPrice={minPrice}
              maxPrice={maxPrice}
              sortOptions={sortOptions}
              onSortChange={(value) => {
                onSortChange(value);
                // Optional: Close sheet after sort change on mobile
                // setIsOpen(false);
              }}
              onPriceChange={onPriceChange}
              onCategoryToggle={onCategoryToggle}
              onClearFilters={() => {
                onClearFilters();
            
              }}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
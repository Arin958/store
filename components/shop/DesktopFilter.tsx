// components/shop/DesktopFilters.tsx
'use client';

import { Button } from '@/components/ui/button';
import { FilterContent } from './FilterContent';
import { SortOption } from './ProductFilter';


export interface FiltersProps {
  sortBy: SortOption;
  priceRange: [number, number];
  selectedCategories: string[];
  categories: string[];
  minPrice: number;
  maxPrice: number;
  sortOptions: { value: SortOption; label: string }[];
  onSortChange: (value: string) => void;
  onPriceChange: (value: number[]) => void;
  onCategoryToggle: (category: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const DesktopFilters = ({
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
  return (
    <div className="hidden md:block space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-8 px-2 text-xs"
          >
            Clear all
          </Button>
        )}
      </div>
      <FilterContent
        sortBy={sortBy}
        priceRange={priceRange}
        selectedCategories={selectedCategories}
        categories={categories}
        minPrice={minPrice}
        maxPrice={maxPrice}
        sortOptions={sortOptions}
        onSortChange={onSortChange}
        onPriceChange={onPriceChange}
        onCategoryToggle={onCategoryToggle}
        onClearFilters={onClearFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
};
// components/shop/FilterContent.tsx
'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { SortOption } from './ProductFilter';


interface FilterContentProps {
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
  className?: string;
}

export const FilterContent = ({
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
  className,
}: FilterContentProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Sort By */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Sort By</Label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Price Range</Label>
        <div className="pt-2 px-1">
          <Slider
            min={minPrice}
            max={maxPrice}
            step={1}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={onPriceChange}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Categories</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 px-2 py-1 rounded-md transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryToggle(category)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="w-full"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );
};
// components/shop/ProductFilters.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { DesktopFilters } from './DesktopFilter';
import { MobileFilters } from './MobileFilter';

export type SortOption = 
  | 'popularity'
  | 'rating'
  | 'newest'
  | 'price-asc'
  | 'price-desc';

export interface FilterOptions {
  sortBy: SortOption;
  priceRange: [number, number];
  categories: string[];
}

interface ProductFiltersProps {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
  className?: string;
}

export const ProductFilters = ({
  categories,
  minPrice,
  maxPrice,
  onFilterChange,
  initialFilters,
  className,
}: ProductFiltersProps) => {
  const [sortBy, setSortBy] = useState<SortOption>(initialFilters?.sortBy || 'popularity');
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters?.priceRange || [minPrice, maxPrice]
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.categories || []
  );

  // Update when initialFilters changes (e.g., from URL)
  useEffect(() => {
    if (initialFilters) {
      // Defer state updates to avoid synchronous setState within effect which
      // can cause cascading renders. Schedule updates on a microtask.
      Promise.resolve().then(() => {
        setSortBy(initialFilters.sortBy);
        setPriceRange(initialFilters.priceRange);
        setSelectedCategories(initialFilters.categories);
      });
    }
  }, [initialFilters]);

  const sortOptions = [
    { value: 'popularity' as const, label: 'Most Popular' },
    { value: 'rating' as const, label: 'Average Rating' },
    { value: 'newest' as const, label: 'Newest First' },
    { value: 'price-asc' as const, label: 'Price: Low to High' },
    { value: 'price-desc' as const, label: 'Price: High to Low' },
  ];

  const applyFilters = useCallback((filters: FilterOptions) => {
    onFilterChange(filters);
  }, [onFilterChange]);

  const handleSortChange = useCallback((value: string) => {
    const newSortBy = value as SortOption;
    setSortBy(newSortBy);
    applyFilters({ sortBy: newSortBy, priceRange, categories: selectedCategories });
  }, [priceRange, selectedCategories, applyFilters]);

  const handlePriceChange = useCallback((value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setPriceRange(newRange);
    applyFilters({ sortBy, priceRange: newRange, categories: selectedCategories });
  }, [sortBy, selectedCategories, applyFilters]);

  const handleCategoryToggle = useCallback((category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    applyFilters({ sortBy, priceRange, categories: newCategories });
  }, [sortBy, priceRange, selectedCategories, applyFilters]);

  const clearAllFilters = useCallback(() => {
    setSortBy('popularity');
    setPriceRange([minPrice, maxPrice]);
    setSelectedCategories([]);
    applyFilters({
      sortBy: 'popularity',
      priceRange: [minPrice, maxPrice],
      categories: [],
    });
  }, [minPrice, maxPrice, applyFilters]);

  const hasActiveFilters = 
    sortBy !== 'popularity' || 
    priceRange[0] !== minPrice || 
    priceRange[1] !== maxPrice || 
    selectedCategories.length > 0;

  const filterProps = {
    sortBy,
    priceRange,
    selectedCategories,
    categories,
    minPrice,
    maxPrice,
    sortOptions,
    onSortChange: handleSortChange,
    onPriceChange: handlePriceChange,
    onCategoryToggle: handleCategoryToggle,
    onClearFilters: clearAllFilters,
    hasActiveFilters,
  };

  return (
    <div className={cn("", className)}>
      <DesktopFilters {...filterProps} />
      <MobileFilters {...filterProps} />
    </div>
  );
};
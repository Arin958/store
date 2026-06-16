
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductFilters, SortOption } from '@/components/shop/ProductFilter';

import { SearchInput } from '@/components/ui/SearchInput';
import { useProductStore } from '@/store/useProductStore';
import { getUniqueCategories, getPriceRange, applyAllFilters } from '@/lib/filterUtils';
import { SharedGrid } from '../shared/CardGrid/CardGrid';

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, isLoading } = useProductStore();
  
  // Get filters from URL params
  const [filters, setFilters] = useState<{
    sortBy: SortOption;
    priceRange: [number, number];
    categories: string[];
  }>({
      sortBy: (searchParams.get('sort') as SortOption) || 'popularity',

    priceRange: [
      Number(searchParams.get('minPrice')) || 0,
      Number(searchParams.get('maxPrice')) || 1000,
    ],
    categories: searchParams.get('categories')?.split(',') || [],
  });
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  
  const categories = useMemo(() => getUniqueCategories(products), [products]);
  const priceRange = useMemo(() => getPriceRange(products), [products]);
  
  // Update URL when filters or search change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.sortBy !== 'popularity') params.set('sort', filters.sortBy);
    if (filters.priceRange[0] > priceRange[0]) params.set('minPrice', filters.priceRange[0].toString());
    if (filters.priceRange[1] < priceRange[1]) params.set('maxPrice', filters.priceRange[1].toString());
    if (filters.categories.length) params.set('categories', filters.categories.join(','));
    if (searchQuery) params.set('search', searchQuery);
    
    const newUrl = params.toString() ? `/shop?${params.toString()}` : '/shop';
    router.replace(newUrl, { scroll: false });
  }, [filters, searchQuery, priceRange, router]);
  
  // Apply filters and search
  const filteredProducts = useMemo(() => {
    let filtered = applyAllFilters(products, filters.sortBy as SortOption, filters.priceRange, filters.categories);
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [products, filters, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchInput 
        onSearch={setSearchQuery} 
        placeholder="Search products..."
        defaultValue={searchQuery}
        className="mb-8 max-w-md mx-auto"
        delay={300}
      />
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64">
          <ProductFilters
            categories={categories}
            minPrice={priceRange[0]}
            maxPrice={priceRange[1]}
            onFilterChange={setFilters}
            initialFilters={filters}
          />
        </div>
        
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            {(searchQuery || filters.categories.length > 0 || filters.sortBy !== 'popularity') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    sortBy: 'popularity',
                    priceRange: [priceRange[0], priceRange[1]],
                    categories: [],
                  });
                }}
                className="text-sm text-primary hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          
          <SharedGrid
            items={filteredProducts.map(p => ({ 
              ...p, 
              image: p.images?.[p.primaryImageIndex || 0], 
              type: 'product' 
            }))}
            variant="shop"
            itemsPerPage={12}
            isLoading={isLoading}
            onItemClick={(id) => router.push(`/product/${id}`)}
          />
        </div>
      </div>
    </div>
  );
}
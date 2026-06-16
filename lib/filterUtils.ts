// lib/filter-utils.ts
import { SortOption } from '@/components/shop/ProductFilter';
import { Product } from '@/types/product';


export const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'popularity':
      return sorted.sort((a, b) => b.sold - a.sold);
    
    case 'rating':
      // If you have rating in your product, use it
      // For now, using sold as proxy for popularity
      return sorted.sort((a, b) => b.sold - a.sold);
    
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    
    default:
      return sorted;
  }
};

export const filterProductsByPrice = (
  products: Product[],
  minPrice: number,
  maxPrice: number
): Product[] => {
  return products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );
};

export const filterProductsByCategories = (
  products: Product[],
  categories: string[]
): Product[] => {
  if (categories.length === 0) return products;
  return products.filter((product) => categories.includes(product.category));
};

export const getUniqueCategories = (products: Product[]): string[] => {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories).sort();
};

export const getPriceRange = (products: Product[]): [number, number] => {
  if (products.length === 0) return [0, 1000];
  const prices = products.map((p) => p.price);
  return [Math.min(...prices), Math.max(...prices)];
};

export const applyAllFilters = (
  products: Product[],
  sortBy: SortOption,
  priceRange: [number, number],
  categories: string[]
): Product[] => {
  let filtered = filterProductsByPrice(products, priceRange[0], priceRange[1]);
  filtered = filterProductsByCategories(filtered, categories);
  filtered = sortProducts(filtered, sortBy);
  return filtered;
};
// app/page.tsx - Using utility functions
'use client';


import { useProductStore } from '@/store/useProductStore';

import { SharedGrid } from '@/components/shared/CardGrid/CardGrid';
import { getCategoriesFromProducts, getFeaturedProducts } from '@/lib/productUtils';

export default function HomePage() {
  const { products, isLoading, getProductsByCategory } = useProductStore();
  
  const categories = getCategoriesFromProducts(products);
  const featuredProducts = getFeaturedProducts(products, 8);
  
  return (
    <div className="container mx-auto py-8 space-y-16">
      <SharedGrid
        items={categories}
        variant="home"
        itemsPerPage={4}
        isLoading={isLoading}
        title="Shop by Category"
        description={`Browse our ${categories.length} categories`}
        onItemClick={(id) => {
          const category = categories.find(c => c.id === id);
          if (category) {
            const productsInCategory = getProductsByCategory(category.name);
            console.log(`${category.name}: ${productsInCategory.length} products`);
          }
        }}
      />
      
      <SharedGrid
        items={featuredProducts}
        variant="home"
        itemsPerPage={4}
        isLoading={isLoading}
        title="Featured Products"
        description="Our most popular items"
        onItemClick={(id) => {
          console.log('Product clicked:', id);
        }}
      />
    </div>
  );
}
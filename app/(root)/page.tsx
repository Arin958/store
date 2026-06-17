// app/page.tsx - Using utility functions
'use client';


import { useProductStore } from '@/store/useProductStore';


import { SharedGrid } from '@/components/shared/CardGrid/CardGrid';
import { getCategoriesFromProducts, getFeaturedProducts } from '@/lib/productUtils';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { products, isLoading, getProductsByCategory, isInitialized, initializeStore } = useProductStore();
  const navigate = useRouter()
  
  const categories = getCategoriesFromProducts(products);
  const featuredProducts = getFeaturedProducts(products, 8);

  useEffect(() => {
    initializeStore();
  }, [isInitialized, initializeStore]);
  
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
          navigate.push(`/product/${id}`);
        }}
      />
    </div>
  );
}
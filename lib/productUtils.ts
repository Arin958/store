
import { Product } from '@/types/product';

export const getCategoriesFromProducts = (products: Product[]) => {
  const categoryMap = new Map();
  
  products.forEach(product => {
    if (!categoryMap.has(product.category)) {
      const categoryImage = product.images?.[product.primaryImageIndex || 0] || product.images?.[0];
      
      categoryMap.set(product.category, {
        id: product.category.toLowerCase().replace(/\s+/g, '-'),
        name: product.category,
        image: categoryImage || '/placeholder-category.jpg',
        productCount: 0,
      });
    }
    
    categoryMap.get(product.category).productCount++;
  });
  
  return Array.from(categoryMap.values()).map(cat => ({
    id: cat.id,
    name: cat.name,
    image: cat.image,
    type: 'category' as const,
    productCount: cat.productCount,
  }));
};

export const getFeaturedProducts = (products: Product[], limit: number = 8) => {
  return [...products]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, limit)
    .map(product => ({
      id: product.id,
      name: product.name,
      image: product.images?.[product.primaryImageIndex || 0] || product.images?.[0],
      type: 'product' as const,
      price: product.price,
      category: product.category,
    }));
};
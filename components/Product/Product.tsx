// app/products/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { ProductDetail } from './ProductDetail';
import { ProductSkeleton } from './ProductSkeleton';

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params.id as string;
    
    const [isLoading, setIsLoading] = useState(true);
    const getProductById = useProductStore((state) => state.getProductById);
  
    
    const product = getProductById(productId);
   
    useEffect(() => {
        // Simulate loading or fetch if needed
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        
        return () => clearTimeout(timer);
    }, [productId]);
    
    // Redirect if product not found
    useEffect(() => {
        if (!isLoading && !product) {
            router.push('/404');
        }
    }, [isLoading, product, router]);
    
    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <ProductSkeleton />
            </div>
        );
    }
    
    if (!product) {
        return null;
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
            <ProductDetail 
                product={product} 
                relatedProducts={[]}
                rating={4.5}
                reviewCount={128}
            />
        </div>
    );
}
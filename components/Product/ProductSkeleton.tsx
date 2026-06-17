// components/product/ProductDetail/ProductSkeleton.tsx
'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function ProductSkeleton() {
    return (
        <div className="space-y-8">
            {/* Breadcrumbs Skeleton */}
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
            </div>
            
            {/* Main Product Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Gallery Skeleton */}
                <div className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <div className="grid grid-cols-5 gap-2">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="aspect-square rounded-lg" />
                        ))}
                    </div>
                </div>
                
                {/* Info Skeleton */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-3/4" />
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    
                    <Skeleton className="h-10 w-48" />
                    
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-24" />
                        <div className="flex gap-2">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-10 w-14" />
                            ))}
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-24" />
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                        <Skeleton className="h-12 col-span-2" />
                        <Skeleton className="h-12" />
                        <Skeleton className="h-12 col-span-full" />
                    </div>
                </div>
            </div>
            
            {/* Tabs Skeleton */}
            <div className="mt-12">
                <div className="flex gap-8 border-b">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-10 w-24" />
                    ))}
                </div>
                <div className="pt-6 space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        </div>
    );
}
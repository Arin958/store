'use client';

import { Star, StarHalf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductInfoProps {
    name: string;
    category: string;
    price: number;
    rating: number;
    reviewCount: number;
    description: string;
    createdAt: string;
    discount?: number;
    className?: string;
}


function formatCurrency (price: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

export function ProductInfo({
    name,
    category,
    price,
    rating,
    reviewCount,
    description,
    createdAt,
    discount,
    className
}: ProductInfoProps) {
    const displayRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(displayRating);
    const hasHalfStar = displayRating % 1 !== 0;
    
    const discountedPrice = discount ? price * (1 - discount / 100) : price;
    
    return (
        <div className={cn("space-y-6", className)}>
            {/* Category & Badges */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="uppercase font-medium">{category}</span>
                <span>•</span>
                <span>Added {new Date(createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                })}</span>
                {discount && (
                    <Badge variant="destructive" className="ml-2">
                        -{discount}%
                    </Badge>
                )}
            </div>
            
            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => {
                        if (i < fullStars) {
                            return (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            );
                        } else if (i === fullStars && hasHalfStar) {
                            return (
                                <StarHalf key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            );
                        } else {
                            return (
                                <Star key={i} className="w-5 h-5 text-gray-300" />
                            );
                        }
                    })}
                </div>
                <span className="font-medium">{rating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                    ({reviewCount} reviews)
                </span>
            </div>
            
            {/* Price */}
            <div className="flex items-center gap-4">
                <span className="text-3xl sm:text-4xl font-bold">
                    {formatCurrency(discountedPrice)}
                </span>
                {discount && (
                    <span className="text-lg text-muted-foreground line-through">
                        {formatCurrency(price)}
                    </span>
                )}
                {discount && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Save {formatCurrency(price - discountedPrice)}
                    </Badge>
                )}
            </div>
            
            {/* Description */}
            <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>{description}</p>
            </div>
        </div>
    );
}
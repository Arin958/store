// components/product/ProductTabs/ReviewsTab/ReviewSummary.tsx
'use client';

import { Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ReviewSummaryProps {
    reviews: Array<{
        rating: number;
    }>;
}

export function ReviewSummary({ reviews }: ReviewSummaryProps) {
    const totalReviews = reviews.length;
    
    const averageRating = totalReviews > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;
    
    const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
        const count = reviews.filter(r => r.rating === star).length;
        return {
            star,
            count,
            percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0
        };
    });
    
    if (totalReviews === 0) {
        return (
            <div className="flex items-center justify-center p-8 rounded-xl border bg-muted/20">
                <div className="text-center">
                    <Star className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <h3 className="font-medium">No Reviews Yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Be the first to review this product!
                    </p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl bg-linear-to-br from-primary/5 via-primary/10 to-transparent border">
            {/* Average Rating */}
            <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4">
                    <div>
                        <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
                        <div className="flex items-center gap-1 mt-1 justify-center md:justify-start">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={cn(
                                        "w-5 h-5",
                                        i < Math.round(averageRating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                    )}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Rating Distribution */}
            <div className="col-span-2 space-y-1.5">
                {ratingDistribution.map(({ star, percentage }) => (
                    <div key={star} className="flex items-center gap-3">
                        <span className="text-sm font-medium w-6">{star}</span>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 shrink-0" />
                        <div className="flex-1">
                            <Progress 
                                value={percentage} 
                                className="h-2 bg-gray-200"
                            />
                        </div>
                        <span className="text-sm text-muted-foreground w-8 text-right">
                            {percentage > 0 ? Math.round(percentage) : 0}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
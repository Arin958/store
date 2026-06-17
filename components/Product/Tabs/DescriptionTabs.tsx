
'use client';

import { CheckCircle2, Truck, Shield, RefreshCw} from 'lucide-react';

interface DescriptionTabProps {
    description: string;
}

export function DescriptionTab({ description }: DescriptionTabProps) {
    const features = [
        {
            icon: <CheckCircle2 className="w-5 h-5" />,
            title: 'Premium Quality',
            description: 'Made with high-grade materials'
        },
        {
            icon: <Truck className="w-5 h-5" />,
            title: 'Fast Delivery',
            description: 'Free shipping on orders over $50'
        },
        {
            icon: <Shield className="w-5 h-5" />,
            title: 'Secure Payment',
            description: '100% secure checkout'
        },
        {
            icon: <RefreshCw className="w-5 h-5" />,
            title: 'Easy Returns',
            description: '30-day money-back guarantee'
        }
    ];
    
    return (
        <div className="space-y-6">
            {/* Product Description */}
            <div className="prose prose-gray max-w-none">
                <p className="text-base leading-relaxed">{description}</p>
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-muted/30 border">
                {features.map((feature, index) => (
                    <div 
                        key={index} 
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50 transition-colors"
                    >
                        <div className={cn(
                            "p-2 rounded-full shrink-0",
                            {
                                'bg-green-100 text-green-600': index === 0,
                                'bg-blue-100 text-blue-600': index === 1,
                                'bg-purple-100 text-purple-600': index === 2,
                                'bg-orange-100 text-orange-600': index === 3,
                            }
                        )}>
                            {feature.icon}
                        </div>
                        <div>
                            <p className="text-sm font-medium">{feature.title}</p>
                            <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Import cn for conditional classes
import { cn } from '@/lib/utils';
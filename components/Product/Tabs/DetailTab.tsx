
'use client';

import {
    Layers, Package, TrendingUp, Calendar, Clock,
    Ruler, DollarSign, Info, Hash, BadgeCheck,
    ShoppingBag, Eye, Heart
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface DetailsTabProps {
    product: Product;
}

interface DetailItemProps {
    icon: React.ReactNode;
    label: string;
    value: string | React.ReactNode;
    className?: string;
    variant?: 'default' | 'highlight';
}

function DetailItem({ icon, label, value, className, variant = 'default' }: DetailItemProps) {
    return (
        <div className={cn(
            "flex items-start gap-3 p-4 rounded-lg transition-colors",
            variant === 'highlight'
                ? "bg-primary/5 border border-primary/10"
                : "bg-muted/30 hover:bg-muted/50",
            className
        )}>
            <div className={cn(
                "mt-0.5",
                variant === 'highlight' ? "text-primary" : "text-primary/70"
            )}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{label}</p>
                <div className="font-medium mt-0.5 wrap-break-word">{value}</div>
            </div>
        </div>
    );
}

export function DetailsTab({ product }: DetailsTabProps) {
    const {
        id,
        category,
        price,
        stock,
        sold,
        sizes,
        createdAt,
    } = product;

    const detailItems = [
        {
            icon: <Hash className="w-5 h-5" />,
            label: 'Product ID',
            value: id
        },
        {
            icon: <Layers className="w-5 h-5" />,
            label: 'Category',
            value: category.charAt(0).toUpperCase() + category.slice(1)
        },
        {
            icon: <DollarSign className="w-5 h-5" />,
            label: 'Price',
            value: `$${price.toFixed(2)}`
        },
        {
            icon: <Package className="w-5 h-5" />,
            label: 'Stock Status',
            value: (
                <div className="flex items-center gap-2 mt-0.5">
                    <span>{stock} units</span>
                    {stock <= 0 ? (
                        <Badge variant="destructive" className="text-xs">
                            Out of Stock
                        </Badge>
                    ) : stock <= 10 ? (
                        <Badge variant="destructive" className="text-xs">
                            Low Stock
                        </Badge>
                    ) : stock <= 50 ? (
                        <Badge variant="default" className="text-xs bg-yellow-500">
                            Limited Stock
                        </Badge>
                    ) : (
                        <Badge variant="default" className="text-xs bg-green-500">
                            In Stock
                        </Badge>
                    )}
                </div>
            )
        },
        {
            icon: <TrendingUp className="w-5 h-5" />,
            label: 'Units Sold',
            value: `${sold} units`
        },
        {
            icon: <Calendar className="w-5 h-5" />,
            label: 'Added Date',
            value: new Date(createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            })
        },
        {
            icon: <Clock className="w-5 h-5" />,
            label: 'Last Updated',
            value: new Date(createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            })
        }
    ];

    if (sizes && sizes.length > 0) {
        detailItems.push({
            icon: <Ruler className="w-5 h-5" />,
            label: 'Available Sizes',
            value: (
                <div className="flex flex-wrap gap-1.5 mt-0.5">
                    {sizes.map((size) => (
                        <Badge
                            key={size}
                            variant="outline"
                            className="text-xs font-medium px-3 py-1"
                        >
                            {size}
                        </Badge>
                    ))}
                </div>
            )
        });
    }

    // Statistics
    const stats = [
        { label: 'Views', value: '2.4k', icon: <Eye className="w-4 h-4" /> },
        { label: 'Wishlists', value: '156', icon: <Heart className="w-4 h-4" /> },
        { label: 'Orders', value: '89', icon: <ShoppingBag className="w-4 h-4" /> },
    ];

    return (
        <div className="space-y-6">
            {/* Product Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border"
                    >
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm font-medium">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {detailItems.map((item, index) => (
                    <DetailItem
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        value={item.value}
                        variant={item.label === 'Stock Status' && stock <= 10 ? 'highlight' : 'default'}
                    />
                ))}
            </div>

            {/* Additional Info Card */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <Info className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-medium text-sm">Product Information</p>
                        <div className="text-sm text-muted-foreground mt-1">
                            This product is part of our {category} collection.
                            All items are quality checked before shipping.
                            {sizes && sizes.length > 0 && ` Available in ${sizes.join(', ')}.`}
                        </div>
                        {sold > 100 && (
                            <div className="mt-2 flex items-center gap-2">
                                <BadgeCheck className="w-4 h-4 text-green-500" />
                                <span className="text-xs text-green-600 font-medium">
                                    Popular item - {sold} units sold
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}



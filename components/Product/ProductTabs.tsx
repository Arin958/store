// components/product/ProductTabs/index.tsx
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, MessageSquare, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { DescriptionTab } from '../Product/Tabs/DescriptionTabs';

import { DetailsTab } from '../Product/Tabs/DetailTab';

interface ProductTabsProps {
    product: Product;
    productId: string;
    reviewCount?: number;
}

export function ProductTabs({
    product,
    reviewCount = 0
}: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState('description');

    const tabs = [
        {
            value: 'description',
            label: 'Description',
            icon: <Info className="w-4 h-4" />
        },
        {
            value: 'reviews',
            label: 'Reviews',
            icon: <MessageSquare className="w-4 h-4" />,
            badge: reviewCount > 0 ? reviewCount.toString() : undefined
        },
        {
            value: 'details',
            label: 'Product Details',
            icon: <Layers className="w-4 h-4" />
        },
    ];

    return (
        <div className="w-full">
            <Tabs
                defaultValue="description"
                className="w-full"
                onValueChange={setActiveTab}
            >
                <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 h-auto gap-0 ">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className={cn(
                                "relative rounded-none border-b-2 border-transparent px-4 sm:px-6 py-3.5 text-sm font-medium transition-all whitespace-nowrap",
                                "data-[state=active]:border-primary data-[state=active]:text-primary",
                                "hover:text-foreground hover:bg-muted/50",
                                "gap-2"
                            )}
                        >
                            {tab.icon}
                            {tab.label}
                            {tab.badge && (
                                <Badge
                                    variant="secondary"
                                    className="ml-1.5 text-xs px-2 py-0 h-5 min-w-5 flex items-center justify-center"
                                >
                                    {tab.badge}
                                </Badge>
                            )}
                            {activeTab === tab.value && (
                                <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary" />
                            )}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <div className="mt-6">
                    <TabsContent value="description" className="mt-0">
                        <DescriptionTab description={product.description} />
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-0">
                        {/* <ReviewsTab productId={productId} /> */}
                        <div className="h-96 flex items-center justify-center">No Reviews</div>
                    </TabsContent>

                    <TabsContent value="details" className="mt-0">
                        <DetailsTab product={product} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
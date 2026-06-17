'use client';

import { useState } from 'react';
import { 
    ShoppingCart, 
    Heart, 
    Share2, 
    Minus, 
    Plus,
    Check,
    Truck,
    RefreshCw,
    Shield,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


interface ProductActionsProps {
    productId: string;
    productName: string;
    price: number;
    stock: number;
    sizes?: string[];
    className?: string;
}

export function ProductActions({ 
  
    productName,
  
    stock,
    sizes = [],
    className 
}: ProductActionsProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    
    const inStock = stock > 0;
    
    const handleQuantityChange = (delta: number) => {
        setQuantity((prev) => {
            const newValue = prev + delta;
            return Math.max(1, Math.min(stock, newValue));
        });
    };
    
    const handleAddToCart = async () => {
        if (sizes.length > 0 && !selectedSize) {
            alert({
                title: "Please select a size",
                description: "Choose a size before adding to cart",
                variant: "destructive",
            });
            return;
        }
        
        setIsAddingToCart(true);
        
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        alert({
            title: "Added to cart!",
            description: `${quantity} × ${productName} ${selectedSize ? `(Size: ${selectedSize})` : ''}`,
            action: (
                <Button variant="outline" size="sm">
                    View Cart
                </Button>
            ),
        });
        
        setIsAddingToCart(false);
    };
    
    const handleBuyNow = async () => {
        if (sizes.length > 0 && !selectedSize) {
            alert({
                title: "Please select a size",
                description: "Choose a size before proceeding",
                variant: "destructive",
            });
            return;
        }
        
        window.location.href = '/checkout';
    };
    
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: productName,
                    url: window.location.href,
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(window.location.href);
            alert({
                title: "Link copied!",
                description: "Share this product with your friends",
            });
        }
    };
    
    return (
        <div className={cn("space-y-6", className)}>
            {/* Size Selection */}
            {sizes.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Select Size</label>
                        <button className="text-sm text-primary hover:underline">
                            Size Guide
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all",
                                    selectedSize === size
                                        ? "border-primary bg-primary/5 text-primary"
                                        : "border-gray-200 hover:border-gray-300"
                                )}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Stock Status */}
            <div className="flex items-center gap-4">
                {inStock ? (
                    <div className="flex items-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span className="font-medium">In Stock</span>
                        <span className="text-sm text-muted-foreground">
                            ({stock} units available)
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-medium">Out of Stock</span>
                    </div>
                )}
            </div>
            
            {/* Quantity */}
            <div className="space-y-3">
                <label className="text-sm font-medium">Quantity</label>
                <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">
                            {quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            disabled={quantity >= stock}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        Max {stock} items
                    </span>
                </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid gap-3">
                <div className="grid grid-cols-3 gap-3">
                    <Button
                        size="lg"
                        className="col-span-2"
                        onClick={handleAddToCart}
                        disabled={!inStock || isAddingToCart}
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className="px-0"
                    >
                        <Heart className={cn(
                            "w-5 h-5",
                            isWishlisted && "fill-red-500 text-red-500"
                        )} />
                        <span className="sr-only">Add to wishlist</span>
                    </Button>
                </div>
                
                <Button
                    size="lg"
                    variant="secondary"
                    onClick={handleBuyNow}
                    disabled={!inStock}
                >
                    Buy Now
                </Button>
                
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="w-full gap-2"
                >
                    <Share2 className="w-4 h-4" />
                    Share this product
                </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="w-4 h-4 shrink-0" />
                    <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <RefreshCw className="w-4 h-4 shrink-0" />
                    <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground sm:col-span-2">
                    <Shield className="w-4 h-4 shrink-0" />
                    <span>Secure checkout with SSL encryption</span>
                </div>
            </div>
        </div>
    );
}
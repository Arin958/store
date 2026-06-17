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
  AlertCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart/useCartStore';
import { Product } from '@/types/product';

interface ProductActionsProps {
  product: Product;
  className?: string;
}

export function ProductActions({
  product,
  className,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] =
    useState('');
  const [isWishlisted, setIsWishlisted] =
    useState(false);
  const [isAddingToCart, setIsAddingToCart] =
    useState(false);

  const addItem = useCartStore(
    (state) => state.addItem
  );

  const stock = product.stock;
  const sizes = product.sizes || [];

  const inStock = stock > 0;

  const handleQuantityChange = (
    delta: number
  ) => {
    setQuantity((prev) => {
      const newValue = prev + delta;

      return Math.max(
        1,
        Math.min(stock, newValue)
      );
    });
  };

  const handleAddToCart = async () => {
    if (
      sizes.length > 0 &&
      !selectedSize
    ) {
      window.alert(
        'Please select a size'
      );
      return;
    }

    setIsAddingToCart(true);

    try {
      addItem(
        product,
        quantity,
        selectedSize
          ? { size: selectedSize }
          : undefined
      );

      alert(
        "Added to cart"
      );

      // Later:
      // toast.success(...)
      // openCartDrawer()
    } catch (error) {
      console.error(error);

      window.alert(
        'Failed to add item to cart'
      );
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    if (
      sizes.length > 0 &&
      !selectedSize
    ) {
      window.alert(
        'Please select a size'
      );
      return;
    }

    handleAddToCart();

    window.location.href =
      '/checkout';
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          url: window.location.href,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      await navigator.clipboard.writeText(
        window.location.href
      );

      window.alert(
        'Link copied to clipboard'
      );
    }
  };

  return (
    <div
      className={cn(
        'space-y-6',
        className
      )}
    >
      {/* Size Selection */}
      {sizes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              Select Size
            </label>

            <button className="text-sm text-primary hover:underline">
              Size Guide
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() =>
                  setSelectedSize(size)
                }
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all',
                  selectedSize === size
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 hover:border-gray-300'
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

            <span className="font-medium">
              In Stock
            </span>

            <span className="text-sm text-muted-foreground">
              ({stock} available)
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />

            <span className="font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Quantity */}
      <div className="space-y-3">
        <label className="text-sm font-medium">
          Quantity
        </label>

        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() =>
                handleQuantityChange(-1)
              }
              disabled={quantity <= 1}
              className="p-2"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-12 text-center font-medium">
              {quantity}
            </span>

            <button
              onClick={() =>
                handleQuantityChange(1)
              }
              disabled={quantity >= stock}
              className="p-2"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid gap-3">
        <div className="grid grid-cols-3 gap-3">
          <Button
            size="lg"
            className="col-span-2"
            onClick={handleAddToCart}
            disabled={
              !inStock ||
              isAddingToCart
            }
          >
            <ShoppingCart className="mr-2 h-5 w-5" />

            {isAddingToCart
              ? 'Adding...'
              : 'Add To Cart'}
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() =>
              setIsWishlisted(
                !isWishlisted
              )
            }
          >
            <Heart
              className={cn(
                'h-5 w-5',
                isWishlisted &&
                  'fill-red-500 text-red-500'
              )}
            />
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
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share this product
        </Button>
      </div>
    </div>
  );
}
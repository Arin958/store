// components/checkout/OrderSummary.tsx

'use client';

import { useCartStore } from '@/store/cart/useCartStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  ShoppingBag,
  Truck,
  Package,
  CreditCard,
  ShieldCheck,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function OrderSummary() {
  const items = useCartStore((state) => state.items);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showShippingInfo, setShowShippingInfo] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal > 100 ? 0 : 5;
  const tax = subtotal * 0.13; // 13% tax
  const discount = subtotal > 50 ? 5 : 0; // $5 off for orders over $50
  const total = subtotal + shipping + tax - discount;

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isFreeShipping = subtotal > 100;

  if (items.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Your cart is empty</p>
          <Button variant="outline" className="mt-4" asChild>
            <a href="/shop">Continue Shopping</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-4 shadow-lg hover:shadow-xl transition-shadow">
      {/* Header with Cart Summary */}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <Badge 
                variant="secondary" 
                className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
              >
                {itemCount}
              </Badge>
            </div>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
          <span className="flex items-center gap-1">
            <Package className="w-3 h-3" />
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
          <span className="flex items-center gap-1">
            <Truck className="w-3 h-3" />
            {isFreeShipping ? 'Free' : '$5.00'} shipping
          </span>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4 pt-0">
          {/* Items List */}
          <ScrollArea className={cn(
            "pr-4 -mr-4",
            items.length > 3 ? "max-h-75" : "max-h-[200px]"
          )}>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 group hover:bg-accent/50 p-2 rounded-lg transition-colors"
                >
                  {/* Product Image */}
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    {item.product.images ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Package className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                    {/* Quantity Badge */}
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-1 -right-1 h-5 min-w-[20px] p-0 flex items-center justify-center text-[10px] bg-background"
                    >
                      {item.quantity}
                    </Badge>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="font-medium text-sm truncate">
                          {item.product.name}
                        </p>
                        {item.product.category && (
                          <p className="text-xs text-muted-foreground">
                            {item.product.category}
                          </p>
                        )}
                      </div>
                      <p className="font-medium text-sm whitespace-nowrap">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Price per unit */}
                    <p className="text-xs text-muted-foreground mt-1">
                      ${item.product.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Free Shipping Progress */}
          {!isFreeShipping && subtotal > 0 && (
            <div className="space-y-1.5 bg-muted/50 p-3 rounded-lg">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progress to free shipping</span>
                <span className="font-medium">${(100 - subtotal).toFixed(2)} more</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          <Separator />

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span className="flex items-center gap-1">
                  <span>Discount</span>
                  <Badge variant="outline" className="text-[10px] h-4 border-green-200 text-green-600">
                    -${discount.toFixed(2)}
                  </Badge>
                </span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Shipping</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Free shipping on orders over $100</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-medium">Free</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (13%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold text-lg">Total</span>
                <p className="text-xs text-muted-foreground">Including all taxes</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-2xl text-primary">
                  ${total.toFixed(2)}
                </span>
                {discount > 0 && (
                  <p className="text-xs text-green-600">
                    Saved ${discount.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-[10px] text-muted-foreground">Secure Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-[10px] text-muted-foreground">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CreditCard className="w-4 h-4 text-primary" />
                <span className="text-[10px] text-muted-foreground">Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Toggle Shipping Info */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs"
            onClick={() => setShowShippingInfo(!showShippingInfo)}
          >
            {showShippingInfo ? 'Hide' : 'Show'} shipping details
            {showShippingInfo ? (
              <ChevronUp className="ml-1 h-3 w-3" />
            ) : (
              <ChevronDown className="ml-1 h-3 w-3" />
            )}
          </Button>

          {showShippingInfo && (
            <div className="text-xs text-muted-foreground space-y-1 bg-muted/30 p-3 rounded-lg">
              <p>• Standard delivery: 3-5 business days</p>
              <p>• Free shipping on orders over $100</p>
              <p>• Tracking number provided after dispatch</p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
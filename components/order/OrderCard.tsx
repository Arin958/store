"use client"
import { Order } from '@/types/order';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Package, Clock, CreditCard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
}

export function OrderCard({ order }: OrderCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400',
    delivered: 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400',
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const firstItem = order.items[0];
  const productImage = firstItem?.product?.images?.[0] || '';
  const remainingItems = order.items.length - 1;

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 overflow-hidden"
    >
      <CardContent className="p-2">
        <div className="flex items-stretch">
          {/* Product Image */}
          {productImage && (
            <div className="relative w-24 sm:w-28 md:w-32 shrink-0 bg-gray-50 dark:bg-gray-800">
              <Image 
                src={productImage} 
                alt={firstItem?.product?.name || 'Product'} 
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
              {remainingItems > 0 && (
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
                  +{remainingItems}
                </div>
              )}
            </div>
          )}

          <div className="flex-1 p-4 md:p-5 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    Order #{order.id.slice(0, 8)}
                  </h3>
                  <Badge 
                    className={`${statusColors[order.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {formatDate(order.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Package className="h-3.5 w-3.5" />
                    {order.items.length} items
                  </span>
                  {firstItem?.product?.name && (
                    <span className="hidden sm:inline text-muted-foreground/70">
                      • {firstItem.product.name}
                      {remainingItems > 0 && ` +${remainingItems} more`}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                    <CreditCard className="h-3.5 w-3.5" />
                    {order.customerInfo.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                     order.customerInfo.paymentMethod === 'esewa' ? 'eSewa' : 'Khalti'}
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    ${order.total.toFixed(2)}
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white mt-4">
                    <Button variant="default">
                    <Link href={`/order/${order.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
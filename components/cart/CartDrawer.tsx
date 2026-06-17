'use client';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

import { useCartStore } from '@/store/cart/useCartStore';
import Image from 'next/image';

interface CartDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CartDrawer({
    open,
    onOpenChange,
}: CartDrawerProps) {

    const { items, removeItem, updateQuantity } = useCartStore();

    const total = items.reduce(
        (sum, item) =>
            sum +
            item.product.price * item.quantity,
        0
    );

    return (
        <Sheet
            open={open}
            onOpenChange={onOpenChange}
        >
            <SheetContent className="flex flex-col w-full sm:max-w-lg p-0">
                {/* Header - Fixed at top */}
                <SheetHeader className="shrink-0 px-6 py-4 border-b">
                    <SheetTitle>
                        Shopping Cart ({items.length})
                    </SheetTitle>
                </SheetHeader>

                {/* Scrollable Items Area */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-center text-muted-foreground">
                                Your cart is empty
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-3 border-b pb-4 last:border-0"
                                >
                                    <Image
                                        src={
                                            item.product.images?.[0] ||
                                            '/placeholder.png'
                                        }
                                        alt={item.product.name}
                                        className="h-20 w-20 rounded-md object-cover shrink-0"
                                        width={80}
                                        height={80}
                                    />

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium truncate">
                                            {item.product.name}
                                        </h4>

                                        <p className="text-sm text-muted-foreground">
                                            ${item.product.price.toFixed(2)}
                                        </p>

                                        <div className="mt-2 flex items-center gap-2">
                                            <button
                                                className="rounded border px-2 py-0.5 hover:bg-gray-100 transition-colors"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity - 1
                                                    )
                                                }
                                            >
                                                -
                                            </button>

                                            <span className="min-w-5 text-center">
                                                {item.quantity}
                                            </span>

                                            <button
                                                className="rounded border px-2 py-0.5 hover:bg-gray-100 transition-colors"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity + 1
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() =>
                                            removeItem(item.id)
                                        }
                                        className="text-sm text-red-500 hover:text-red-600 transition-colors shrink-0"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer with Total and Checkout - Fixed at bottom */}
                {items.length > 0 && (
                    <div className="shrink-0 border-t bg-white/95 backdrop-blur-sm px-6 py-4">
                        <div className="flex justify-between font-semibold mb-4">
                            <span className="text-lg">Total</span>
                            <span className="text-lg text-black">
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        <button className="w-full rounded-md bg-black py-3 text-white font-medium hover:bg-gray-800 transition-colors active:scale-[0.98]">
                            Checkout
                        </button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
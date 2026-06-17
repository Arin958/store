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
            <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>
                        Shopping Cart ({items.length})
                    </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                    {items.length === 0 ? (
                        <p className="text-center text-muted-foreground">
                            Your cart is empty
                        </p>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-3 border-b pb-4"
                            >
                                <Image
                                    src={
                                        item.product.images?.[0] ||
                                        '/placeholder.png'
                                    }
                                    alt={item.product.name}
                                    className="h-20 w-20 rounded-md object-cover"
                                />

                                <div className="flex-1">
                                    <h4 className="font-medium">
                                        {item.product.name}
                                    </h4>

                                    <p className="text-sm text-muted-foreground">
                                        $
                                        {item.product.price.toFixed(
                                            2
                                        )}
                                    </p>

                                    <div className="mt-2 flex items-center gap-2">
                                        <button
                                            className="rounded border px-2"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity - 1
                                                )
                                            }
                                        >
                                            -
                                        </button>

                                        <span>
                                            {item.quantity}
                                        </span>

                                        <button
                                            className="rounded border px-2"
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
                                    className="text-sm text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="mt-6 border-t pt-4">
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        <button className="mt-4 w-full rounded-md bg-black py-3 text-white">
                            Checkout
                        </button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
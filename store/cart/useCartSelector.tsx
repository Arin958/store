// store/cartSelectors.ts

import { CartItem } from '@/types/cart';

const VALID_COUPONS = {
  SAVE10: {
    discount: 10,
    type: 'percentage',
  },
  SAVE20: {
    discount: 20,
    type: 'percentage',
  },
  FREESHIP: {
    discount: 0,
    type: 'fixed',
  },
} as const;

export const useCartSelectors = {
  totalItems(items: CartItem[]) {
    return items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  },

  subtotal(items: CartItem[]) {
    return items.reduce(
      (sum, item) =>
        sum +
        item.product.price * item.quantity,
      0
    );
  },

  tax(subtotal: number) {
    return subtotal * 0.1;
  },

  shipping(items: CartItem[]) {
    return items.length > 0 ? 10 : 0;
  },

  discount(
    subtotal: number,
    couponCode: string | null
  ) {
    if (!couponCode) return 0;

    const coupon =
      VALID_COUPONS[
        couponCode as keyof typeof VALID_COUPONS
      ];

    if (!coupon) return 0;

    if (coupon.type === 'percentage') {
      return (
        subtotal *
        (coupon.discount / 100)
      );
    }

    return coupon.discount;
  },

  total(
    subtotal: number,
    tax: number,
    shipping: number,
    discount: number
  ) {
    return (
      subtotal +
      tax +
      shipping -
      discount
    );
  },
};
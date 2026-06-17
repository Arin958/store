// store/useCartStore.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Product } from '@/types/product';
import { CartItem } from '@/types/cart';
import { useCartSelectors } from './useCartSelector';

type Coupon = {
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder?: number;
};

const VALID_COUPONS: Record<string, Coupon> = {
  SAVE10: { discount: 10, type: 'percentage', minOrder: 50 },
  SAVE20: { discount: 20, type: 'percentage', minOrder: 100 },
  FREESHIP: { discount: 0, type: 'fixed' },
};

interface CartStore {
  userId: string | null;
  items: CartItem[];
  couponCode: string | null;
  error: string | null;

  initializeCart: (userId?: string) => void;

  addItem: (
    product: Product,
    quantity?: number,
    attributes?: Record<string, string>
  ) => void;

  removeItem: (cartItemId: string) => void;

  updateQuantity: (
    cartItemId: string,
    quantity: number
  ) => void;

  clearCart: () => void;

  applyCoupon: (code: string) => boolean;

  removeCoupon: () => void;

  isInCart: (productId: string) => boolean;

  getItemByProductId: (
    productId: string
  ) => CartItem | undefined;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      userId: null,
      items: [],
      couponCode: null,
      error: null,

      initializeCart: (userId) => {
        const state = get();

        if (
          userId &&
          state.userId &&
          state.userId !== userId
        ) {
          set({
            userId,
            items: [],
            couponCode: null,
            error: null,
          });

          return;
        }

        if (userId) {
          set({ userId });
        }
      },

      addItem: (
        product,
        quantity = 1,
        attributes
      ) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.productId === product.id
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? {
                      ...item,
                      quantity:
                        item.quantity + quantity,
                    }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id: crypto.randomUUID(),
                productId: product.id,
                product,
                quantity,
                selectedAttributes: attributes,
              },
            ],
          };
        });
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== cartItemId
          ),
        }));
      },

      updateQuantity: (
        cartItemId,
        quantity
      ) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === cartItemId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () =>
        set({
          items: [],
          couponCode: null,
          error: null,
        }),

      applyCoupon: (code) => {
        const coupon =
          VALID_COUPONS[code.toUpperCase()];

        if (!coupon) {
          set({
            error: 'Invalid coupon code',
          });

          return false;
        }

        const subtotal =
          useCartSelectors.subtotal(
            get().items
          );

        if (
          coupon.minOrder &&
          subtotal < coupon.minOrder
        ) {
          set({
            error: `Minimum order of $${coupon.minOrder} required`,
          });

          return false;
        }

        set({
          couponCode: code.toUpperCase(),
          error: null,
        });

        return true;
      },

      removeCoupon: () =>
        set({
          couponCode: null,
          error: null,
        }),

      isInCart: (productId) =>
        get().items.some(
          (item) => item.productId === productId
        ),

      getItemByProductId: (productId) =>
        get().items.find(
          (item) => item.productId === productId
        ),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(
        () => localStorage
      ),

      partialize: (state) => ({
        userId: state.userId,
        items: state.items,
        couponCode: state.couponCode,
      }),
    }
  )
);
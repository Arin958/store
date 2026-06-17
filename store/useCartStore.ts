import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";

export interface CartActions {
  // Cart management
  initializeCart: (userId?: string) => void;
  clearCart: () => void;
  
  // Item management
  addItem: (product: Product, quantity?: number, attributes?: Record<string, string>) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  
  // Coupon management
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  
  // Getters
  getItemCount: () => number;
  getTotalPrice: () => number;
  isInCart: (productId: string) => boolean;
  getItemByProductId: (productId: string) => CartItem | undefined;
}
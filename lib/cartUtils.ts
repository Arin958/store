
import { CartItem } from '@/types/cart';

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const price = item.product.discountPrice || item.product.price;
    return total + price * item.quantity;
  }, 0);
};

export const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const calculateTax = (subtotal: number, taxRate: number = 0.1): number => {
  return subtotal * taxRate;
};

export const calculateShipping = (items: CartItem[]): number => {
  const subtotal = calculateSubtotal(items);
  // Free shipping over $50
  return subtotal >= 50 ? 0 : 5.99;
};

export const calculateTotal = (
  subtotal: number,
  tax: number,
  shipping: number,
  discount: number = 0
): number => {
  return subtotal + tax + shipping - discount;
};

export const generateCartItemId = (): string => {
  return `item_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
};

export const isProductInCart = (items: CartItem[], productId: string): boolean => {
  return items.some(item => item.productId === productId);
};

export const getCartItemByProductId = (
  items: CartItem[],
  productId: string
): CartItem | undefined => {
  return items.find(item => item.productId === productId);
};
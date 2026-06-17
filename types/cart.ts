// types/cart.ts
import { Product } from './product';

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedAttributes?: Record<string, string>;
}

export interface CartState {
  // Cart data
  userId: string | null;
  items: CartItem[];
  couponCode: string | null;
  
  // Calculated values
  totalItems: number;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  totalPrice: number;
  
  // UI state
  isLoading: boolean;
  error: string | null;
}


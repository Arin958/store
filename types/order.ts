import { CartItem } from "./cart";

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  paymentMethod: 'cod' | 'esewa' | 'khalti';
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    customerInfo: CustomerInfo;
    subTotal: number;
    shipping: number;
    total: number;
    status: "pending" | "delivered" | "cancelled";
    createdAt: string;
}
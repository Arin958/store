import { CartItem } from "./cart";

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    subTotal: number;
    shipping: number;
    total: number;
    status: "pending" | "delivered" | "cancelled";
    createdAt: string;
}
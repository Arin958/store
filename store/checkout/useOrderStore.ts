// store/order/useOrderStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Order } from '@/types/order';

interface OrderStore {
  orders: Order[];


  createOrder: (
    order: Omit<Order, 'id' | 'createdAt'>
  ) => string;

  getOrdersByUser: (
    userId: string
  ) => Order[];
}

export const useOrderStore =
  create<OrderStore>()(
    persist(
      (set, get) => ({
        orders: [],

        createOrder: (orderData) => {
          const orderId =
            crypto.randomUUID();

          const newOrder: Order = {
            ...orderData,
            id: orderId,
            createdAt:
              new Date().toISOString(),
          };

          set((state) => ({
            orders: [
              newOrder,
              ...state.orders,
            ],
          }));

          return orderId;
        },

        getOrdersByUser: (
          userId
        ) => {
          return get().orders.filter(
            (order) =>
              order.userId === userId
          );
        },
      }),
      {
        name: 'order-storage',
      }
    )
  );
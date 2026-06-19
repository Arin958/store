// app/orders/page.tsx

'use client';

import { useState, useMemo } from 'react';
import { useOrderStore } from "@/store/checkout/useOrderStore";
import { useAuthStore } from "@/store/useAuthStore";
import { OrderCard } from "./OrderCard";
import { OrderFilters } from "./OrderFilter";

export default function Orders() {
  const user = useAuthStore((state) => state.user);
  const orders = useOrderStore((state) => state.orders);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState('all');

  const userOrders = useMemo(() => {
    return orders.filter((order) => order.userId === user?.id);
  }, [orders, user]);

  const filteredOrders = useMemo(() => {
    return userOrders.filter((order) => {
      // Search filter
      const searchMatch = 
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customerInfo.fullName.toLowerCase().includes(search.toLowerCase()) ||
        order.customerInfo.email.toLowerCase().includes(search.toLowerCase());

      // Status filter
      const statusMatch = status === 'all' || order.status === status;

      // Payment method filter
      const paymentMatch = paymentMethod === 'all' || order.customerInfo.paymentMethod === paymentMethod;

      return searchMatch && statusMatch && paymentMatch;
    });
  }, [userOrders, search, status, paymentMethod]);

  const handleClearFilters = () => {
    setSearch('');
    setStatus('all');
    setPaymentMethod('all');
  };

  if (!user) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">Please login to view orders</h1>
      </div>
    );
  }

  if (!userOrders.length) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <p className="text-muted-foreground">No orders found</p>
          <p className="text-sm text-muted-foreground mt-2">Start shopping to see your orders here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground mt-1">
          {userOrders.length} order{userOrders.length > 1 ? 's' : ''} found
        </p>
      </div>

      <OrderFilters
        search={search}
        status={status}
        paymentMethod={paymentMethod}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onPaymentMethodChange={setPaymentMethod}
        onClear={handleClearFilters}
      />

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <p className="text-muted-foreground">No orders match your filters</p>
          <button 
            onClick={handleClearFilters}
            className="text-sm text-primary hover:underline mt-2"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}
        </div>
      )}
    </div>
  );
}
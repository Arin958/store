'use client';

import { useParams, useRouter } from 'next/navigation';
import { useOrderStore } from '@/store/checkout/useOrderStore';
import { useAuthStore } from '@/store/useAuthStore';
import { OrderDetail } from './OrderDetail';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const orders = useOrderStore((state) => state.orders);

  const order = orders.find(
    (o) => o.id === params.id && o.userId === user?.id
  );

  if (!user) {
    router.push('/login');
    return null;
  }

  if (!order) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <p className="text-muted-foreground mb-6">
            The order you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
          </p>
          <button
            onClick={() => router.push('/orders')}
            className="text-primary hover:underline"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return <OrderDetail order={order} />;
}
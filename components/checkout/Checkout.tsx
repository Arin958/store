'use client';

import CheckoutForm from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { useAuthStore } from "@/store/useAuthStore";



export default function Checkout() {
  const user = useAuthStore(state => state.user);
//   back to previous page

const goBack = () => {
  window.history.back();
};

  if(!user) {
    alert('You must be logged in to checkout');
    goBack();
    return;
  };
  return (
    <div className="grid lg:grid-cols-2 p-4">
      <CheckoutForm />
      <OrderSummary />
    </div>
  );
}
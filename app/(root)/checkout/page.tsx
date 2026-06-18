import CheckoutForm from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";


export default function CheckoutPage() {
  return (
    <div className="grid lg:grid-cols-2 p-4">
      <CheckoutForm />
      <OrderSummary />
    </div>
  );
}
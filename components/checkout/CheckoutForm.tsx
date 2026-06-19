'use client';

import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Loader2,
  CheckCircle2,
  Truck,
  MapPin,
  User,
  Mail,
  Phone,
  Building2,
  Globe,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useOrderStore } from '@/store/checkout/useOrderStore';
import { useCartStore } from '@/store/cart/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  paymentMethod: 'cod' | 'esewa' | 'khalti';
}



export default function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const createOrder = useOrderStore((state) => state.createOrder);
  const clearCart = useCartStore((state) => state.clearCart);
  const items = useCartStore((state) => state.items);
  const user = useAuthStore((state) => state.user);
 
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      paymentMethod: 'cod',
    },
    mode: 'onBlur',
  });



const onSubmit = (
  data: CheckoutFormData
) => {
  if (!user) return;

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      item.product.price *
        item.quantity,
    0
  );

  const shipping =
    subtotal > 0 ? 5 : 0;

  const total =
    subtotal + shipping;

  const orderId =
    createOrder({
      userId: user.id,
      items,
      customerInfo: data,
      subTotal: subtotal,
      shipping,
      total,

      status: 'pending',
    });

  clearCart();

  alert(
    `Order Placed Successfully! Order ID: ${orderId}`
  );

  setSubmitted(true);
  setIsSubmitting(false);


};



  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Order Placed Successfully!</h3>
            <p className="text-muted-foreground">
              Thank you for your order. You will receive a confirmation email shortly.
            </p>
            <Button className="mt-6" onClick={() => setSubmitted(false)}>
              Place Another Order
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Checkout Information
          </CardTitle>
          <CardDescription>Fill in your details to complete the order</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <h4 className="font-medium text-sm">Personal Details</h4>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-1">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  className={cn(errors.fullName && 'border-destructive')}
                  {...register('fullName', {
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1">
                  <Mail className="w-3 h-3" /> Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className={cn(errors.email && 'border-destructive')}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-1">
                <Phone className="w-3 h-3" /> Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="98XXXXXXXX"
                className={cn(errors.phone && 'border-destructive')}
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Phone number must be 10 digits',
                  },
                })}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <h4 className="font-medium text-sm">Delivery Address</h4>
            </div>
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country" className="flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Country <span className="text-destructive">*</span>
                </Label>
                <Input
                id="country"
                placeholder="Your country"
                className={cn(errors.country && 'border-destructive')}
                {...register('country', {
                  required: 'Country is required',
                })}
                >
        
                </Input>
                {errors.country && (
                  <p className="text-sm text-destructive">{errors.country.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> City <span className="text-destructive">*</span>
                </Label>
                <Input
                id="city"
                placeholder="Your city"
                className={cn(errors.city && 'border-destructive')}
                {...register('city', {
                  required: 'City is required',
               
                })}
                >
             
                </Input>
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city.message}</p>
                )}
              </div>
            </div>

         
          </div>

          {/* Payment Method */}
{/* Payment Method */}
<Controller
  name="paymentMethod"
  control={control}
  rules={{ required: 'Please select a payment method' }}
  render={({ field }) => (
    <RadioGroup
      value={field.value || 'cod'}
      onValueChange={field.onChange}
      className="grid grid-cols-1 md:grid-cols-3 gap-3"
    >
      <Label
        htmlFor="cod"
        className={cn(
          'flex items-center space-x-2 border rounded-lg p-4 transition-colors cursor-pointer font-normal',
          'hover:bg-accent hover:border-primary',
          field.value === 'cod' && 'border-primary bg-accent'
        )}
      >
        <RadioGroupItem value="cod" id="cod" />
        <div className="flex-1">
          <div className="font-medium">Cash on Delivery</div>
          <div className="text-xs text-muted-foreground">Pay when you receive</div>
        </div>
      </Label>

      <Label
        htmlFor="esewa"
        className={cn(
          'flex items-center space-x-2 border rounded-lg p-4 transition-colors cursor-pointer font-normal',
          'hover:bg-accent hover:border-primary',
          field.value === 'esewa' && 'border-primary bg-accent'
        )}
      >
        <RadioGroupItem value="esewa" id="esewa" />
        <div className="flex-1">
          <div className="font-medium">eSewa</div>
          <div className="text-xs text-muted-foreground">Pay with eSewa wallet</div>
        </div>
      </Label>

      <Label
        htmlFor="khalti"
        className={cn(
          'flex items-center space-x-2 border rounded-lg p-4 transition-colors cursor-pointer font-normal',
          'hover:bg-accent hover:border-primary',
          field.value === 'khalti' && 'border-primary bg-accent'
        )}
      >
        <RadioGroupItem value="khalti" id="khalti" />
        <div className="flex-1">
          <div className="font-medium">Khalti</div>
          <div className="text-xs text-muted-foreground">Pay with Khalti wallet</div>
        </div>
      </Label>
    </RadioGroup>
  )}
/>
{errors.paymentMethod && (
  <p className="text-sm text-destructive">{errors.paymentMethod.message}</p>
)}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="w-full flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
            <span>By placing this order, you agree to our</span>
            <span className="flex gap-2">
              <Button variant="link" className="h-auto p-0 text-sm" type="button">
                Terms of Service
              </Button>
              <span>•</span>
              <Button variant="link" className="h-auto p-0 text-sm" type="button">
                Privacy Policy
              </Button>
            </span>
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Place Order'
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
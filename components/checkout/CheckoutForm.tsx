'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      country: 'Nepal',
      city: '',
      address: '',
      paymentMethod: 'cod',
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    console.log('Checkout Data:', data);

    // Later:
    // createOrder(data);
    // clearCart();
    // router.push('/order-success');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          {...register('fullName', {
            required: 'Full name is required',
          })}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
          })}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          {...register('phone', {
            required: 'Phone number is required',
          })}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          {...register('country', {
            required: 'Country is required',
          })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          {...register('city', {
            required: 'City is required',
          })}
        />
        {errors.city && (
          <p className="text-sm text-destructive">{errors.city.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          rows={4}
          {...register('address', {
            required: 'Address is required',
          })}
        />
        {errors.address && (
          <p className="text-sm text-destructive">{errors.address.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Payment Method</Label>
        <RadioGroup
          defaultValue="cod"
          {...register('paymentMethod')}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod" className="font-normal">
              Cash On Delivery
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="esewa" id="esewa" />
            <Label htmlFor="esewa" className="font-normal">
              eSewa (Demo)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="khalti" id="khalti" />
            <Label htmlFor="khalti" className="font-normal">
              Khalti (Demo)
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full">
        Place Order
      </Button>
    </form>
  );
}
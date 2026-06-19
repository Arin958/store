// components/orders/OrderFilters.tsx

'use client';

import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface OrderFiltersProps {
  search: string;
  status: string;
  paymentMethod: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPaymentMethodChange: (value: string) => void;
  onClear: () => void;
}

export function OrderFilters({
  search,
  status,
  paymentMethod,
  onSearchChange,
  onStatusChange,
  onPaymentMethodChange,
  onClear,
}: OrderFiltersProps) {
  const hasFilters = search || status !== 'all' || paymentMethod !== 'all';

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by order ID or customer name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <div className="flex gap-2 flex-wrap">
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-32.5">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={paymentMethod} onValueChange={onPaymentMethodChange}>
          <SelectTrigger className="w-35">
            <SelectValue placeholder="Payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payment</SelectItem>
            <SelectItem value="cod">Cash on Delivery</SelectItem>
            <SelectItem value="esewa">eSewa</SelectItem>
            <SelectItem value="khalti">Khalti</SelectItem>
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
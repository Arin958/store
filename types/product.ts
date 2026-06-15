export interface Product {
  id: string;
  name: string;
  images: string[];
  price: number;
  category: string;
  description: string;
  primaryImageIndex?: number;
}
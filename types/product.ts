export interface Product {
  id: string;
  name: string;
  images: string[];
  price: number;
  category: string;
  description: string;
  stock: number;
  sold: number;
  primaryImageIndex?: number;
  createdAt: string;
}
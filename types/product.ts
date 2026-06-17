export interface Product {
  id: string;
  name: string;
  images: string[];
  price: number;
  category: string;
  description: string;
  stock: number;
  sold: number;
  discount?: number;
  discountPrice?: number;
  sizes?: string[];
  primaryImageIndex?: number;
  createdAt: string;
}
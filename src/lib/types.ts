export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  main_image: string;
  slug: string;
  stock: number;
  low_stock_threshold: number;
  is_featured: boolean;
  is_newarrival: boolean;
  category: number;
  category_name: string;
  available_sizes: number[];
  available_colors: number[];
  images: {
    id: number;
    image: string;
    color: number;
  }[];
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface CartItem {
  id: number;
  user: number;
  product: number;
  product_name: string;
  color: number;
  color_name: string;
  size: number;
  size_name: string;
  product_price: string;
  quantity: number;
}

export interface Cart {
  success: boolean;
  data: {
    items: CartItem[];
    total_price: number;
  };
}

export interface ProductImage {
  id: number;
  image: string;
  color: string;
}

export interface Color {
  id: number;
  name: string;
  code: string;
}

export interface Size {
  id: number;
  name: string;
}

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
  subcategory: string;
  available_sizes: number[];
  available_colors: number[];
  images: string[];
  created_at: string;
}

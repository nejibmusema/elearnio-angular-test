export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}

export interface ProductsResponse {
  products: Product[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PriceRange {
  min: number;
  max: number;
}

export type SortOrder = 'asc' | 'desc';

export interface FilterQuery {
  categories?: string[];
  priceRange?: PriceRange;
  searchTerm?: string;
  sortbyPrice?: SortOrder;
}

export interface CartQuantityChangeEvent {
  product: Product;
  quantity: number;
}

export const CART_STORAGE_KEY = 'app_cart_items';

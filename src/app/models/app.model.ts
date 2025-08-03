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

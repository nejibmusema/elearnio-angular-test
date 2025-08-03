import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Product } from '../models/app.model';
import { ApiService } from '../services/api.service';
import { inject } from '@angular/core';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: null | string;
}

const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState(initialProductState),
  withMethods((store) => {
    const apiService = inject(ApiService);

    patchState(store, { loading: true, error: null });
    const fetchProducts = () => {
      apiService.getProducts().subscribe({
        next: (products) => {
          patchState(store, { products, loading: false });
        },
        error: (error) => {
          patchState(store, { error: error.message, loading: false });
        },
      });
    };

    return { fetchProducts };
  }),
);

import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { FilterQuery, PriceRange, Product } from '../models/app.model';
import { ApiService } from '../services/api.service';
import { computed, inject } from '@angular/core';

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

    const fetchProducts = (query?: FilterQuery) => {
      patchState(store, { products: [], loading: true, error: null });
      apiService.getProducts(query).subscribe({
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
  withComputed((store) => ({
    isLoading: computed(() => store.loading()),
    hasError: computed(() => store.error() !== null),
  })),
);

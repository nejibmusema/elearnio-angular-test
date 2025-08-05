import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from '@ngrx/signals';
import { ApiService } from '../services/api.service';

interface CategoryState {
  categories: string[];
  loading: boolean;
  error: null | string;
}

const initialCategoryState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const CategoryStore = signalStore(
  { providedIn: 'root' },
  withState(initialCategoryState),
  withComputed((store) => ({
    isLoading: computed(() => store.loading()),
    hasError: computed(() => store.error() !== null),
  })),
  withMethods((store) => {
    const apiService = inject(ApiService);

    patchState(store, { loading: true, error: null });

    const fetchCategories = () => {
      apiService.getProductCategories().subscribe({
        next: (categories) => {
          patchState(store, { categories, loading: false });
        },
        error: (err) => {
          patchState(store, { loading: false, error: err.message });
        },
      });
    };

    return { fetchCategories };
  }),
);

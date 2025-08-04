import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from '@ngrx/signals';
import { PriceRange } from '../models/app.model';
import { ApiService } from '../services/api.service';

interface PriceRangeState {
  priceRange: PriceRange;
  loading: boolean;
  error: null | string;
}

const initialPriceRangeState: PriceRangeState = {
  priceRange: { min: 0, max: 1000 },
  loading: false,
  error: null,
};

export const PriceRangeStore = signalStore(
  { providedIn: 'root' },
  withState(initialPriceRangeState),
  withComputed((store) => ({
    isLoading: computed(() => store.loading()),
    hasError: computed(() => store.error() !== null),
  })),
  withMethods((store) => {
    const apiService = inject(ApiService);

    patchState(store, { loading: true, error: null });

    const fetchPriceRange = () => {
      apiService.getPriceRange().subscribe({
        next: (priceRange) => {
          patchState(store, { priceRange, loading: false });
        },
        error: (err) => {
          patchState(store, { loading: false, error: err.message });
        },
      });
    };

    return { fetchPriceRange };
  }),
);

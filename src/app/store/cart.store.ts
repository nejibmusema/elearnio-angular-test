import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withComputed,
} from '@ngrx/signals';
import { CartItem, Product } from '../models/app.model';
import { computed, inject } from '@angular/core';
import { ApiService } from '../services/api.service';

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: null | string;
}

export const CartStore = signalStore(
  { providedIn: 'root' },

  withState(() => {
    const apiService = inject(ApiService);
    return {
      items: apiService.loadFromLocalStorage(),
      loading: false,
      error: null,
    };
  }),

  withComputed((store) => ({
    totalItems: computed(() => store.items().length),
    totalPrice: computed(() =>
      store
        .items()
        .reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    ),
  })),

  withMethods((store) => {
    const apiService = inject(ApiService);

    return {
      addItem: (product: Product) => {
        const existingItem = store
          .items()
          .find((i) => i.product.id === product.id);

        let updatedItems: CartItem[];

        if (existingItem) {
          updatedItems = store
            .items()
            .map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
        } else {
          updatedItems = [...store.items(), { product, quantity: 1 }];
        }

        patchState(store, { items: updatedItems });
        apiService.saveToLocalStorage(updatedItems);
      },

      removeItem: (productId: number) => {
        const updatedItems = store
          .items()
          .filter((item) => item.product.id !== productId);

        patchState(store, { items: updatedItems });
        apiService.saveToLocalStorage(updatedItems); // ✅ Save to localStorage
      },

      updateQuantity: (productId: number, quantity: number) => {
        const updatedItems = store
          .items()
          .map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.max(quantity, 1) }
              : item,
          );

        patchState(store, { items: updatedItems });
        apiService.saveToLocalStorage(updatedItems);
      },
    };
  }),
);
